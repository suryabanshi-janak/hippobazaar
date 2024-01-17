import { buildConfig } from 'payload/config';
import type { RichTextAdapter } from 'payload/types';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { Users } from './collections/Users';
import { Products } from './collections/Products/Product';
import { ProductFiles } from './collections/ProductFile';
import { Media } from './collections/Media';
import { Orders } from './collections/Orders';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, ProductFiles, Media, Orders],
  routes: {
    admin: '/sell',
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- HippoBazaar',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}) as RichTextAdapter<any, any, any>,
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
