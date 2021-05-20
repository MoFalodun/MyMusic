import faker from 'faker';

export const songInfo = {
  name: faker.name.firstName(),
  lyrics: faker.lorem.sentence(),
  genre: 'Jazz'
};

export const picture = faker.image.imageUrl();
