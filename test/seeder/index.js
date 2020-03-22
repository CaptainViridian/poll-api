import data from './data';

import { forEach } from '../../src/utils';

export default async () => {
  const db = await import('../../src/db');

  await db.connect();
  await forEach(data, async (collection) => {
    const { default: Model } = await import(`../../src/models/${collection.model}`);
    await Model.deleteMany({});
    await Model.create(collection.documents);
  });
  await db.disconnect();
};
