/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Housing from '../models/HousingModel.js';
import UserAccount from '../models/UserAccountModel.js';
import UserProfile from '../models/UserProfileModel.js';

// get a house's full information with its _id
// TODO: Check if we have better solution to present resident info for who do not have a profile yet
// If this house has residents, their legal full name, phone number, email, and car
// information are needed
// These information are in user profile document
// Current solution: if no profile found for an account, send only the account email
const getHouseInfo = async (req, res) => {
  // req passed jwtVerifyToken check
  // extract house ObjectID from req body
  const { houseId } = req.body;

  try {
    const house = await Housing.findById(houseId).lean().exec();

    // Check if the house with the exists, if not, return 422 response
    if (!house) {
      return res.status(422).json({ message: 'House doesn’t exist.' });
    }
    // If the house exists, find profile information for each resident
    const residentInfo = await Promise.all(house.residents.map(async (resident) => {
      const account = await UserAccount.findById(resident).select('email').lean().exec();
      const profile = await UserProfile.findOne({ userAccountId: resident })
        .select('personalInfo.firstName personalInfo.lastName personalInfo.preferredName personalInfo.carInformation')
        .lean().exec();
      // if the profile exists, return personal info
      if (profile) {
        console.log(`residentAccount: ${resident} profile: ${profile.personalInfo.firstName}`);
        return { ...profile, email: account.email };
      }
      return { email: account.email };
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

export { getHouseInfo, createNewHouse };
