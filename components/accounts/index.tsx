import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image
} from '@nextui-org/react';
import Link from 'next/link';

export const Accounts = () => {
  return (
    <Card className="w-full my-16">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Artur Fruttero</p>
          <p className="text-small text-default-500">Capitán del BARCO ACTUAL</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Dato 1</p>
        <p>Dato 2</p>
        <p>Dato 3</p>
        <p>Dato 4</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
        href={"/"}>
          Volver a inicio
        </Link>
      </CardFooter>
    </Card>
  );
}
