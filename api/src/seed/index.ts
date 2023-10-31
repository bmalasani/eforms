import mongoose from 'mongoose';
import { apiConfig } from '../config';
import { models } from '../models';
import { IForm, IUser } from '../models/types';

const users: IUser[] = [
  {
    firstName: 'Terry',
    lastName: 'Medhurst',
    email: 'atuny0@sohu.com',
    alias: 'atuny0',
    password: '9uQFF1Lh',
    managerAlias: 'Green',
    department: 'Marketing',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Sheldon',
    lastName: 'Quigley',
    email: 'hbingley1@plala.or.jp',
    alias: 'hbingley1',
    password: 'CQutx25i8r',
    managerAlias: 'Brown',
    department: 'Services',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Terrill',
    lastName: 'Hills',
    email: 'rshawe2@51.la',
    alias: 'rshawe2',
    password: 'OWsTbMUgFc',
    managerAlias: 'Gray',
    department: 'Marketing',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Miles',
    lastName: 'Cummerata',
    email: 'yraigatt3@nature.com',
    alias: 'yraigatt3',
    password: 'sRQxjPfdS',
    managerAlias: 'Gray',
    department: 'Business Development',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Mavis',
    lastName: 'Schultz',
    email: 'kmeus4@upenn.edu',
    alias: 'kmeus4',
    password: 'aUTdmmmbH',
    managerAlias: 'Brown',
    department: 'Support',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Alison',
    lastName: 'Reichert',
    email: 'jtreleven5@nhs.uk',
    alias: 'jtreleven5',
    password: 'zY1nE46Zm',
    managerAlias: 'Amber',
    department: 'Accounting',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Oleta',
    lastName: 'Abbott',
    email: 'dpettegre6@columbia.edu',
    alias: 'dpettegre6',
    password: 'YVmhktgYVS',
    managerAlias: 'Blue',
    department: 'Product Management',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Ewell',
    lastName: 'Mueller',
    email: 'ggude7@chron.com',
    alias: 'ggude7',
    password: 'MWwlaeWcOoF6',
    managerAlias: 'Blue',
    department: 'Services',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Demetrius',
    lastName: 'Corkery',
    email: 'nloiterton8@aol.com',
    alias: 'nloiterton8',
    password: 'HTQxxXV9Bq4',
    managerAlias: 'Green',
    department: 'Human Resources',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Eleanora',
    lastName: 'Price',
    email: 'umcgourty9@jalbum.net',
    alias: 'umcgourty9',
    password: 'i0xzpX',
    managerAlias: 'Blue',
    department: 'Marketing',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Marcel',
    lastName: 'Jones',
    email: 'acharlota@liveinternet.ru',
    alias: 'acharlota',
    password: 'M9lbMdydMN',
    managerAlias: 'Amber',
    department: 'Business Development',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },

  {
    firstName: 'Trace',
    lastName: 'Douglas',
    email: 'lgribbinc@posterous.com',
    alias: 'lgribbinc',
    password: 'ftGj8LZTtv9g',
    managerAlias: 'Amber',
    department: 'Research and Development',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Enoch',
    lastName: 'Lynch',
    email: 'mturleyd@tumblr.com',
    alias: 'mturleyd',
    password: 'GyLnCB8gNIp',
    managerAlias: 'Green',
    department: 'Sales',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    email: 'kminchelle@qq.com',
    alias: 'kminchelle',
    password: '0lelplR',
    managerAlias: 'Amber',
    department: 'Marketing',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Trycia',
    lastName: 'Fadel',
    email: 'dpierrof@vimeo.com',
    alias: 'dpierrof',
    password: 'Vru55Y4tufI4',
    managerAlias: 'Gray',
    department: 'Research and Development',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Bradford',
    lastName: 'Prohaska',
    email: 'vcholdcroftg@ucoz.com',
    alias: 'vcholdcroftg',
    password: 'mSPzYZfR',
    managerAlias: 'Brown',
    department: 'Sales',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },

  {
    firstName: 'Gust',
    lastName: 'Purdy',
    email: 'bleveragei@so-net.ne.jp',
    alias: 'bleveragei',
    password: 'UZGAiqPqWQHQ',
    managerAlias: 'Amber',
    department: 'Sales',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Lenna',
    lastName: 'Renner',
    email: 'aeatockj@psu.edu',
    alias: 'aeatockj',
    password: 'szWAG6hc',
    managerAlias: 'Green',
    department: 'Support',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Doyle',
    lastName: 'Ernser',
    email: 'ckensleyk@pen.io',
    alias: 'ckensleyk',
    password: 'tq7kPXyf',
    managerAlias: 'Brown',
    department: 'Product Management',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Tressa',
    lastName: 'Weber',
    email: 'froachel@howstuffworks.com',
    alias: 'froachel',
    password: 'rfVSKImC',
    managerAlias: 'Green',
    department: 'Research and Development',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Felicity',
    lastName: "O'Reilly",
    email: 'beykelhofm@wikispaces.com',
    alias: 'beykelhofm',
    password: 'zQwaHTHbuZyr',
    managerAlias: 'Brown',
    department: 'Legal',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Jocelyn',
    lastName: 'Schuster',
    email: 'brickeardn@fema.gov',
    alias: 'brickeardn',
    password: 'bMQnPttV',
    managerAlias: 'Brown',
    department: 'Product Management',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Edwina',
    lastName: 'Ernser',
    email: 'dfundello@amazon.co.jp',
    alias: 'dfundello',
    password: 'k9zgV68UKw8m',
    managerAlias: 'Blue',
    department: 'Marketing',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Griffin',
    lastName: 'Braun',
    email: 'lgronaverp@cornell.edu',
    alias: 'lgronaverp',
    password: '4a1dAKDv9KB9',
    managerAlias: 'Blue',
    department: 'Engineering',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Piper',
    lastName: 'Schowalter',
    email: 'fokillq@amazon.co.jp',
    alias: 'fokillq',
    password: 'xZnWSWnqH',
    managerAlias: 'Brown',
    department: 'Human Resources',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Kody',
    lastName: 'Terry',
    email: 'xisherwoodr@ask.com',
    alias: 'xisherwoodr',
    password: 'HLDqN5vCF',
    managerAlias: 'Blue',
    department: 'Support',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Macy',
    lastName: 'Greenfelder',
    email: 'jissetts@hostgator.com',
    alias: 'jissetts',
    password: 'ePawWgrnZR8L',
    managerAlias: 'Amber',
    department: 'Product Management',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
  {
    firstName: 'Maurine',
    lastName: 'Stracke',
    email: 'kdulyt@umich.edu',
    alias: 'kdulyt',
    password: '5t6q4KC7O',
    managerAlias: 'Blue',
    department: 'Support',
    lastLogon: new Date(),
    uuid: '',
    permissions: [],
  },
];

const forms: IForm[] = [
  {
    formId: 'test01',
    formName: 'Test Form',
    formGroup: 'Form Test',
    formDescription: 'test form',
    isActive: true,
    permissions: [],     
    activated: new Date('2022-12-18T09:59:58.000Z'),
    fields: {
      key: '0',
      type: 'main',
      props: {},
      children: [
        {
          key: '00',
          type: 'section',
          children: [
            {
              key: '000',
              type: 'row',
              children: [
                {
                  key: '0000',
                  type: 'column',
                  children: [
                    {
                      key: '00000',
                      type: 'text',
                      children: [],
                      props: {
                        count: 1,
                        label: 'First Name',
                        name: 'firstName',
                      },
                    },
                  ],
                  props: {
                    count: '2',
                    sm: 6,
                  },
                },
                {
                  key: '0001',
                  type: 'column',
                  children: [
                    {
                      key: '00010',
                      type: 'text',
                      children: [],
                      props: {
                        count: 1,
                        undefined: 'true',
                        label: 'Last Name',
                        name: 'lastName',
                      },
                    },
                  ],
                  props: {
                    count: '2',
                    sm: 6,
                  },
                },
              ],
              props: {
                count: '2',
              },
            },
            {
              key: '001',
              type: 'row',
              children: [
                {
                  key: '0010',
                  type: 'column',
                  children: [
                    {
                      key: '00100',
                      type: 'text',
                      children: [],
                      props: {
                        count: 1,
                        label: 'Deaprtment',
                        name: 'department',
                      },
                    },
                  ],
                  props: {
                    count: '2',
                    sm: 6,
                  },
                },
                {
                  key: '0011',
                  type: 'column',
                  children: [
                    {
                      key: '00110',
                      type: 'text',
                      children: [],
                      props: {
                        count: 1,
                        label: 'Mobile Number',
                        name: 'mobileNumber',
                      },
                    },
                  ],
                  props: {
                    count: '2',
                    sm: 6,
                  },
                },
              ],
              props: {
                count: '2',
              },
            },
          ],
          props: {
            count: 1,
            title: 'Employee Details',
          },
        },
        {
          key: '01',
          type: 'section',
          children: [
            {
              key: '010',
              type: 'stack',
              children: [
                {
                  key: '0100',
                  type: 'lookup',
                  children: [],
                  props: {
                    count: 1,
                    label: 'Hotel',
                    name: 'hotel',
                    items: [
                      {
                        undefined: '',
                        label: 'A',
                        value: 'a',
                      },
                      {
                        undefined: '',
                        label: 'B',
                        value: 'b',
                      },
                    ],
                  },
                },
                {
                  key: '0101',
                  type: 'lookup',
                  children: [],
                  props: {
                    count: 1,
                    label: 'Room',
                    name: 'room',
                    items: [
                      {
                        undefined: '',
                        label: 'A',
                        value: 'a',
                      },
                      {
                        undefined: '',
                        label: 'B',
                        value: 'b',
                      },
                    ],
                  },
                },
                {
                  key: '0102',
                  type: 'date',
                  children: [],
                  props: {
                    count: 1,
                    label: 'Date',
                    name: 'date',
                  },
                },
                {
                  key: '0103',
                  type: 'time',
                  children: [],
                  props: {
                    count: 1,
                    label: 'Time',
                    name: 'time',
                  },
                },
                {
                  key: '0104',
                  type: 'switch',
                  children: [],
                  props: {
                    count: 1,
                    label: 'Include Meals',
                    name: 'includeMeals',
                  },
                },
                {
                  key: '0105',
                  type: 'check',
                  children: [],
                  props: {
                    count: 1,
                    label: 'Room Service',
                    name: 'roomService',
                  },
                },
              ],
              props: {
                count: 1,
              },
            },
          ],
          props: {
            count: 1,
            title: 'Reservation',
          },
        },
      ],
    },
    workflows: [
      {
        approverLevel: 'Requestor' as any,
        approver: 'self',
        approverMessage: 'Your Request Submitted',
        subject: 'Your Request Submitted',
      },
      {
        approverLevel: 'Reviewer' as any,
        approver: 'reviewer@gg.com',
        approverMessage: 'Your have Reviewed ',
      },
    ],
  },
];

const seedUsers = () => models.Users.insertMany([...users]);
const seedForms = () => models.Forms.insertMany([...forms]);

async function main() {
  try {
    console.log(apiConfig);
    await mongoose.connect(apiConfig.mongoConnection);
    await seedForms();
  } catch (e) {
    console.log(e);
  }
}

main();