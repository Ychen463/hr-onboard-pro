const housingData = {
  name: "7242 Henson Ridge\nEast Patriciachester, OK 12705",
  address: "1131 Ashley Creek",
  landlord: {
    fullName: "Sarah Butler",
    phoneNumber: "236-496-2445",
    email: "carrillopatricia@hotmail.com",
  },
  capacity: 10,
  residents: [
    {
      name: "Prabodhan Fitzgerald",
      phone: "345679",
      avatar: "/path-to-avatar-1.jpg",
    },
    { name: "Hiro Joyce", phone: "345679", avatar: "/path-to-avatar-2.jpg" },
    {
      name: "Lloyd Jefferson",
      phone: "345679",
      avatar: "/path-to-avatar-3.jpg",
    },
    { name: "Ceiran Mayo", phone: "345679", avatar: "/path-to-avatar-4.jpg" },
    {
      name: "Thumbiko James",
      phone: "345679",
      avatar: "/path-to-avatar-5.jpg",
    },
  ],
  isFull: false,
  facilityInfo: {
    beds: 10,
    mattresses: 7,
    tables: 3,
    chairs: 15,
  },
};

const housingReportData = [
  {
    housing: 745,
    title: "Ground president check one.",
    description:
      "Our five national. Standard carry billion community heavy sit wide thank. Dog energy still see write. Sure likely right senior month project.",
    createdBy: 545,
    createdDatetime: "2024-01-31T17:01:39",
    status: "inprogress",
    comments: [
      {
        description: "Listen Mrs five under today up.",
        createdBy: 426,
        lastModifiedDatetime: "2024-02-02T21:34:15",
      },
      {
        description: "Few just family north.",
        createdBy: 563,
        lastModifiedDatetime: "2024-02-23T12:37:34",
      },
      {
        description: "However audience first on budget.",
        createdBy: 958,
        lastModifiedDatetime: "2024-01-27T09:55:40",
      },
      {
        description: "Least agent why wind paper fine try my.",
        createdBy: 641,
        lastModifiedDatetime: "2024-01-29T01:37:02",
      },
    ],
  },
  {
    housing: 745,
    title: "Ground president check one.",
    description:
      "Our five national. Standard carry billion community heavy sit wide thank. Dog energy still see write. Sure likely right senior month project.",
    createdBy: 545,
    createdDatetime: "2024-01-31T17:01:40",
    status: "open",
    comments: [
      {
        description: "Listen Mrs five under today up.",
        createdBy: 426,
        lastModifiedDatetime: "2024-02-02T21:34:15",
      },
      {
        description: "Few just family north.",
        createdBy: 563,
        lastModifiedDatetime: "2024-02-23T12:37:34",
      },
      {
        description: "However audience first on budget.",
        createdBy: 958,
        lastModifiedDatetime: "2024-01-27T09:55:40",
      },
      {
        description: "Least agent why wind paper fine try my.",
        createdBy: 641,
        lastModifiedDatetime: "2024-01-29T01:37:02",
      },
    ],
  },
];

const testing = {};
export { housingData, housingReportData, testing };
