const notes = [
  {
    _id: "5dc974f8df85c15250febbee",
    title: "xxx",
    author: "aaa",
    url: "ddd",
    likes: 7,
    user: {
      username: "turbiv",
      name: "Ivan Turbin",
      id: "5dbb53c1c7594144209d421e"
    },
    __v: 0
  },
  {
    _id: "5dc97534cb87c12d94092b6a",
    title: "author",
    author: "title",
    url: "asd",
    likes: 1,
    user: {
      username: "turbiv",
      name: "Ivan Turbin",
      id: "5dbb53c1c7594144209d421e"
    },
    __v: 0
  },
  {
    _id: "5dcdbde95130a92bc4ffce1b",
    title: "asda",
    author: "asd",
    url: "xxx",
    likes: 0,
    user: {
      username: "turbiv",
      name: "Ivan Turbin",
      id: "5dbb53c1c7594144209d421e"
    },
    __v: 0
  }
];

const getAll = () => {
  return Promise.resolve(notes)
};

export default { getAll }