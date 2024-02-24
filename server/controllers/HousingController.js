/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Housing from '../models/HousingModel.js';

// get a house's full information with its _id
// TODO: revise resident info sent
// If this house has residents, their legal full name, phone number, email, and car
// information are needed
// These information are in onboarding/user profile model
// Check with team, when do each account start to has a onboarding/profile related
const getHouseInfo = async (req, res) => {
  // req passed jwtVerifyToken check
  // extract house ObjectID from req body
  const { houseId } = req.body;

  try {
    const house = await Housing.findById(houseId).populate('residents').lean().exec();

    // Check if the house with the exists, if not, return 422 response
    if (!house) {
      return res.status(422).json({ message: 'House doesn’t exist.' });
    }

    res.status(200).json({
      message: 'House full information found.',
      house,
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
    name, address, landlord, capacity, facilityInfo,
  } = req.body;

  // for now, we allow any of these fields to be empty
  try {
    const newHouse = {
      name,
      address,
      landlord,
      capacity,
      residents: [], // no resident initially
      isFull: false,
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
