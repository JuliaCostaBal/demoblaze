import * as fs from 'fs';
import * as path from 'path';

export interface Product {
  name: string;
  price: string;
  link: string | null;
}

export function writeProductsToFile(products: Product[], filePath: string) {

  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const lines = products.map(
    (product) =>
      `Name: ${product.name}\nPrice: ${product.price}\nLink: ${product.link}\n`,
  );

  const content = lines.join('\n');

  fs.writeFileSync(filePath, content, 'utf-8');
}
