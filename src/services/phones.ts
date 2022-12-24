import {IPhones} from '../interface/phones';
import PhoneIMG1 from '../assets/png/iphone14purple.png';
import PhoneIMG2 from '../assets/png/iphone14black.png';
import PhoneIMG3 from '../assets/png/iphone11red.png';
import PhoneIMG4 from '../assets/png/iphone14white.png';
import PhoneIMG5 from '../assets/png/iphone13blue.png';
import PhoneIMG6 from '../assets/png/samsunga12.png';
import PhoneIMG7 from '../assets/png/samsungFlip3.png';
import PhoneIMG8 from '../assets/png/samsungs21.png';
import PhoneIMG9 from '../assets/png/samsungUltra.png';

export const phonesData: IPhones[] = [
  {
    id: 1,
    name: 'iPhone 14 Pro Max',
    manufacturer: 'Apple',
    color: 'purple',
    price: 1300,
    amount: 5,
    image: PhoneIMG1,
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    manufacturer: 'Apple',
    color: 'black',
    price: 1300,
    amount: 2,
    image: PhoneIMG2,
  },
  {
    id: 3,
    name: 'iPhone 11',
    manufacturer: 'Apple',
    color: 'red',
    price: 800,
    amount: 2,
    image: PhoneIMG3,
  },
  {
    id: 4,
    name: 'iPhone 14',
    manufacturer: 'Apple',
    color: 'white',
    price: 1300,
    amount: 8,
    image: PhoneIMG4,
  },
  {
    id: 5,
    name: 'iPhone 13',
    manufacturer: 'Apple',
    color: 'blue',
    price: 1000,
    amount: 4,
    image: PhoneIMG5,
  },
  {
    id: 6,
    name: 'Galaxy S21 5G',
    manufacturer: 'Samsung',
    color: 'black',
    price: 150,
    amount: 14,
    image: PhoneIMG6,
  },
  {
    id: 7,
    name: 'Galaxy Z Flip3 5G',
    manufacturer: 'Samsung',
    color: 'black',
    price: 800,
    amount: 14,
    image: PhoneIMG7,
  },
  {
    id: 8,
    name: 'Galaxy S21 5G',
    manufacturer: 'Samsung',
    color: 'black',
    price: 450,
    amount: 9,
    image: PhoneIMG8,
  },
  {
    id: 9,
    name: 'Galaxy S22 Ultra',
    manufacturer: 'Samsung',
    color: 'black',
    price: 500,
    amount: 14,
    image: PhoneIMG9,
  },
];
