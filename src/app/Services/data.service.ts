import { Injectable } from '@angular/core';
import { UserCredentials, merchantProduct } from '../interfaces/all-interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ImageLinkComponent } from '../Pages/Dashboard/Merchant/components/image-link/image-link.component';

@Injectable({
  providedIn: 'root',
})


export class DataService {
  storeProducts:any = []
like: any =  [];
  cart: any = [];
  updateProduct: unknown;
  productCategories: any = [];
  productSearchString: string = '';
  selectedStore: { [key: string]: any } = {};
  merchantDashboardNoProjects: boolean = true;

  doesNotExist = { exist: false, term: '' };

  isProductUpdateInstance = false;
  isMobileBool: boolean = false;
  isLoading = false;
  isEditable: boolean = false;
  isEditingTemp: boolean = false;

  customerId: string = '';
  orderId: string = '';
  storeId: string = localStorage.getItem('storeId') || '';
  merchantBusinessType1: string = '';
  merchantStoreName: string = '';
  isInEditMode: boolean = false;
  productId: string = '';
  product: any;
  loginCredentials: UserCredentials = { email: '', password: '' };
  ecommerceWebsite: string = '';
  businessId: string = '';
  showInputLink: boolean = false;
  inputLinkVisibility: { [key: number]: boolean } = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };
  merchantData = { businessId: '', businessName: '', store: { name: '' } };
  typesOfStore: string[] = [
    'Online Store',
    'Blog',
    'Restaurant',
    'Technology company',
    'Portfolio',
    'Weddings',
    'Photography',
    'Professional Services',
    'Online Store',
    'Blog',
    'Restaurant',
    'Technology company',
    'Portfolio',
    'Weddings',
    'Photography',
    'Professional Services',
  ];
  urls: { [key: number]: string } = {
    1: 'assets/images/ecommerce-home-dresses.svg',
    3: 'assets/images/ecommerce-home-tops.svg',
    4: 'assets/images/ecommerce-home-accesories.svg',
    5: 'assets/images/ecommerce-home-sneakers.svg',
    6: 'assets/images/ecommerce-home-two-ladies.svg',
  };

  products: any = [
    {
      isliked: false,
    },
  ];
  productCategory: any = [];
  template: any;
  template1 = {
    id: 'template-1',
    screenshot: '/assets/images/Text.svg',
    text: 'ShopNest',
    fontFamily: 'Inter',
    fontArray: [
      'Inter',
      'Roboto',
      'Anta',
      'Helvetica',
      'sans-serif',
      'Kode Mono',
      'monospace',
    ],
    bodyFontSizeArray: [
      '12px',
      '14px',
      '16px',
      '18px',
      '24px',
      '36px',
      '48px',
      '64px',
      '72px',
    ],
    headerFontSizeArray: [
      '12px',
      '14px',
      '16px',
      '18px',
      '24px',
      '36px',
      '48px',
      '64px',
      '72px',
      '96px',
    ],
    headerfontWeightList: ['300', '400', '500', '600', '700', '800', '900'],
    fontSize: '16px',
    lineHeightList: [
      '1',
      '1.2',
      '1.3',
      '1.4',
      '1.5',
      '1.6',
      '1.7',
      '1.8',
      '1.9',
      '2.0',
    ],
    lineHeight: '1.5',
    fontWeightList: [
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ],
    buttonBorderRadiusList: [
      '0px',
      '2px',
      '4px',
      '6px',
      '8px',
      '10px',
      '12px',
      '16px',
      '18px',
    ],
    primaryColor: '1C222B',
    primaryBackground: '#FFFFFF',
    navbarBackgroundColor: '#000000',
    navbarColor: '#fff',
    body: {
      fontSize: '16px',
      fontWeight: '400',
    },
    headers: {
      fontSize: '24px',
      fontWeight: '400',
    },
    buttons: {
      borderColor: '#1C222B',
      borderRadius: '0px',
      color: '#1C222B',
      backgroundColor: 'pink',
      padding: '1rem 3rem',
    },
    templateImages: {
      heroImage: '/assets/images/shopping-image.jpeg',
      promoImage: 'assets/images/ecommerce-home-two-ladies.svg',
      aboutHeroImage: '/assets/images/ecommerce-about-us-header-image.svg',
      aboutFooterImage:'/assets/images/about-us-last-image.svg',
      contactImage: '/assets/images/about-us-backgroud.svg',
    },
    textAlign: 'center',
    headings: {
      heroHeading: {
        btnText: 'SHOP NOW',
        text: 'level up your style with our summer collections',
        color: 'yellow',
        fontSize: '72px',
        lineHeight: '90px',
        fontWeight: 700,
        bgImage: {
          backgroundSize: 'cover',
          width: '100%',
          height: '50rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        },
      }
      },
      sectionTwo: {
        twoSection: {
          image: 'assets/images/ecommerce-home-two-ladies.svg',
          text: {
            discount: 'UPTO 40% OFF',
            otherText: 'Special offers and great deals',
          },
        },
      },
      sectionThree: {
        name: 'Featured Items',
        twoSection: {
          image: 'assets/images/ecommerce-home-two-ladies.svg',
          text: {
            discount: 'UPTO 40% OFF',
            otherText: 'Special offers and great deals',
          },
        },
      },
    
      aboutUs: {
        heading:{title: 'LEVEL UP YOUR STYLE WITH OUR SUMMER COLLECTIONS', img:'',
              message:`Keep it simpleOne of the most essential website design principles
              to follow is to keep everything simple. It must be easy to scroll through the page, and the content must be easy to read. Learn more`
            },

        ourStory: {title: 'OUR STORY', message:`ShopNest was born from a vision to redefine the way you shop online. With years of experience 
              in the eCommerce industry, we set out to create a one-stop destination where you can discover high-quality products, connect with trusted sellers,
              and enjoy seamless shopping from the comfort of your own nest`
            },
        whyShopWithUs: {
          title1:'WHY SHOP WITH US',
          
            title2: 'Convenience and Ease',
            reason2:
              "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
          
          
            title3: 'Affordable, reliable shipping',
            reason3:
              'Our shipping services offer reliability, convenience, and cost-effectiveness. We guarantee on-time delivery, secure tracking, and efficient customer service.',
          
          
            title4: 'Reliable shipping.',
            reason4:
              "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
          
        },
        team: 
          {
            id1: 'team1',
            name1: 'Abigail Bell',
            role1: 'IBM',
            picture1: '/assets/images/ecommerce-team-1.svg',
       
            id2: 'team2',
            name2: 'Alex King',
            role2: 'eBay',
            picture2: '/assets/images/ecommerce-team-2.svg',
          
            id3: 'team3',
            name3: 'Adam King',
            role3: 'eBay',
            picture3: '/assets/images/ecommerce-team-3.svg',
         
            id4: 'team4',
            name4: 'Mercy Richards',
            role4: 'Starbucks',
            picture4: '/assets/images/ecommerce-team-4.svg',
         
            id5: 'team5',
            name5: 'Raymond Moses',
            role5: 'Starbucks',
            picture5: '/assets/images/ecommerce-team-5.svg',
         
            id6: 'team6',
            name6: 'Jane Miles',
            role6: 'Facebook',
            picture6: '/assets/images/ecommerce-team-6.svg',
        
        }
      },
      contactUs: {
        contactMessage: 'CONTACT US',
        leftPanelInfo: {
          heading: 'GET IN TOUCH',
          pTag: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          phone: '+1012 3456 789',
          email: 'demo@gmail.com',
          location:
            '132 Dartmouth Street Boston, Massachusetts 02156 United States',
        },
      },

    pagesOrder: [
      { name: 'home', value: 'home', includePage: true },
      { name: 'about', value: 'about us', IncludePage: false },
      { name: 'contact', value: 'contact us', includePage: false },
    ],
  }

  constructor(public dialog: MatDialog) {}
  updateText(text: any, ...args: string[]) {
    text = text.replace(/<p>(.*?)<\/p>/g, '$1')
    let targetObj = this.template;
    for (let i = 0; i < args.length - 1; i++) {
        const arg = args[i];
        if (!targetObj[arg]) {
            console.error(`Property '${arg}' not found in template.`);
            return;
        }
        targetObj = targetObj[arg];
    }
    const lastArg = args[args.length - 1];
    targetObj[lastArg] = text;
}
changeImageByLink(pathToProperty:string){
  this.dialog.open(ImageLinkComponent, {
    hasBackdrop: false
  }).afterClosed().subscribe((imageLink) => {
    const keys = pathToProperty.split('.');
    const lastKey:any = keys.pop();
    const targetObj = keys.reduce((acc, key) => {
    return acc[key];
  }, this.template);
    targetObj[lastKey] = imageLink;
  });
}
}
