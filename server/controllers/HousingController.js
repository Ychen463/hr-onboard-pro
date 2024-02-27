/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Housing from '../models/HousingModel.js';
import UserAccount from '../models/UserAccountModel.js';
import RegistrationToken from '../models/RegistrationTokenModel.js';

// get a house's full information with its _id
// TODO: Check if we have better solution to present resident info for who do not have a profile yet
// If this house has residents, their legal full name, phone number, email, and car
// information are needed
// Email is in account. Other information are in user profile document
// Current solution: if no profile found for an account, send only the account email
// UPDATED: for every resident, send the email and name in registrationtokens collection
const getHouseInfo = async (req, res) => {
  // req passed jwtVerifyToken check
  // extract house ObjectID from req body
  const { houseID } = req.params;

  try {
    const house = await Housing.findById(houseID).lean().exec();

    // Check if the house with the exists, if not, return 422 response
    if (!house) {
      return res.status(422).json({ message: 'House doesn’t exist.' });
    }
    // If the house exists, find profile information for each resident
    const residentInfo = await Promise.all(house.residents.map(async (residentAccountId) => {
      const account = await UserAccount.findById(residentAccountId).select('registrationTokenId').lean().exec();
      const registrationToken = await RegistrationToken.findById(account.registrationTokenId)
        .select('email userFirstName userLastName')
        .lean().exec();
      // if the registrationToken exists, return personal info
      if (registrationToken) {
        console.log(`residentAccount: ${account} registrationToken: ${registrationToken}`);
        return { ...registrationToken, userAccountId: residentAccountId };
      }
      return res.status(404).json({ message: 'A Registration Token associated with one of the resident accounts doesn’t exist.' });
    }));

    res.status(200).json({
      message: 'House full information found.',
      house: { ...house, residents: residentInfo },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create a new house given a name, an address, landlord information,
// capacity, basic facility information
const createNewHouse = async (req, res) => {
  // extract information from req body
  const {
    name, address, landlord, facilityInfo,
  } = req.body;

  // for now, we allow any of these fields to be empty
  if (!(name && address && landlord && facilityInfo)) {
    res.status(422).json({ message: 'Miss necessary information to add a new house.' });
    return;
  }

  try {
    const newHouse = {
      name,
      address,
      landlord,
      residents: [], // no resident initially
      facilityInfo,
    };

    const houseCreated = await Housing.create(newHouse);
    console.log('houseCreated: ', houseCreated);
    res.status(201).json({
      message: 'House created successfully.',
      houseCreated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get summary information of all houses
// Name, address, landlord info and resident number
// may need pagination, but currently not
const getHousesSummary = async (req, res) => {
  try {
    const houseListFound = await Housing.find().select('name address landlord residents').lean().exec();
    const houseList = houseListFound.map((house) => (
      { ...house, residents: house.residents.length }));
    res.status(200).json({
      message: 'House list found.',
      houseList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get the information of the house that the user is assigned to with a user’s _id
// Address, List of roommates (preferred or legal full name and phone number)
// TODO: Check if we have better solution to present resident info for who do not have a profile yet
// Current solution: if no profile found for an account, send empty object
// UPDATED: for every resident, send the email and name in registrationtokens collection
const getUserHousing = async (req, res) => {
  const { userId } = req.user;
  console.log(req.user);
  try {
    const account = await UserAccount.findById(userId).select('housingId').lean().exec();
    const house = await Housing.findById(account.housingId).select('address residents').lean().exec();
    // Check if the house with the exists, if not, return 422 response
    if (!house) {
      return res.status(422).json({ message: 'House doesn’t exist.' });
    }
    // If the house exists, find profile information for each resident
    const residentInfo = await Promise.all(house.residents.map(async (residentAccountId) => {
      const residentAccount = await UserAccount.findById(residentAccountId).select('registrationTokenId').lean().exec();
      const registrationToken = await RegistrationToken
        .findById(residentAccount.registrationTokenId)
        .select('email userFirstName userLastName')
        .lean().exec();
      // if the registrationToken exists, return personal info
      if (registrationToken) {
        console.log(`residentAccount: ${account} registrationToken: ${registrationToken}`);
        return { ...registrationToken, userAccountId: residentAccountId };
      }
      return res.status(404).json({ message: 'A Registration Token associated with one of the resident accounts doesn’t exist.' });
    }));

    res.status(200).json({
      message: 'House full information found.',
      house: { ...house, residents: residentInfo },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getHouseInfo, createNewHouse, getHousesSummary, getUserHousing,
};
