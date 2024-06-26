'use client';

import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input } from "@nextui-org/react";
import { registerUser } from '@/services/userService';
import { UserInterface } from '@/app/api/register/route';

export const CreateUser = () => {
  const createUserInitialValue = {
    username: '',
    name: '',
    last_name: '',
    email: '',
    cellphone_number: '',
    document_number: '',
    document_type: '',
    age: 0,
    country: '',
    city: '',
    nationality: '',
    role_id: 0,
    comments: ''
  }

  const formFields = [
    { name: 'username', placeholder: 'Username' },
    { name: 'name', placeholder: 'Name' },
    { name: 'last_name', placeholder: 'Last Name' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'cellphone_number', placeholder: 'Cellphone Number' },
    { name: 'document_number', placeholder: 'Document Number' },
    { name: 'document_type', placeholder: 'Document Type' },
    { name: 'age', placeholder: 'Age', type: 'number' },
    { name: 'country', placeholder: 'Country' },
    { name: 'city', placeholder: 'City' },
    { name: 'nationality', placeholder: 'Nationality' },
    { name: 'role_id', placeholder: 'Role ID', type: 'number' },
    { name: 'comments', placeholder: 'Comments' },
  ];


  const [user, setUser] = useState<UserInterface>(createUserInitialValue);

  const [password, setPassword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(user.email, password, user);
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };


  return (
    <Card className="w-full md:w-2/3 md:px-10 md:py-5">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-xl">CREAR USUARIO</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Divider className="mb-4" />

        <CardBody>
          {formFields.map(({ name, placeholder, type = 'text' }) => (
            <Input
              key={name}
              name={name}
              placeholder={placeholder}
              type={type}
              value={(user as any)[name]}
              onChange={handleInputChange}
              className="mb-4"
            />
          ))}
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
        </CardBody>
        
        <Divider />
        <CardFooter className="flex gap-3 justify-end">
          <Button type="submit">Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};