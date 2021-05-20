import faker from 'faker';

export const albumInfo = {
  albumName: faker.name.firstName(),
  description: faker.lorem.sentence(),
  genre: 'Jazz'
};

export const picture = faker.image.imageUrl();
