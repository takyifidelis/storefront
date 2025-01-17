import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceWebsiteComponent } from './ecommerce-website.component';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../../../../Services/api.service';

describe('EcommerceWebsiteComponent', () => {
  let component: EcommerceWebsiteComponent;
  let fixture: ComponentFixture<EcommerceWebsiteComponent>;
let apiService: APIService;

  beforeEach( () => {
class MockService {
  getSingleStore(): Observable<any> {
    const template = {
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
      primaryColor: 'violet',
      primaryBackground: '#f5f5f5',
      navbarBackgroundColor: '#212529',
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
        borderColor: 'green',
        borderRadius: '0px',
        color: 'blue',
        backgroundColor: 'pink',
        padding: '1rem 3rem',
      },
      templateImages: {
        heroImage: '/assets/images/shopping-image.jpeg',
        promoImage: 'assets/images/ecommerce-home-two-ladies.svg',
        aboutHeroImage: 'https://gitinspired.s3.amazonaws.com/aboutUsHero.jpg',
        aboutFooterImage:
          'https://gitinspired.s3.amazonaws.com/aboutFooterImage.jpg',
        contactImage: 'https://gitinspired.s3.amazonaws.com/contactUsImage.png',
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
          ourStory:
            'ShopNest was born from a vision to redefine the way you shop online. With years of experience in the eCommerce industry, we set out to create a one-stop destination where you can discover high-quality products, connect with trusted sellers, and enjoy seamless shopping from the comfort of your own nest',
          whyShopWithUs: [
            {
              title: 'Convenience and Ease',
              reason:
                "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
            },
            {
              title: 'Affordable, reliable shipping',
              reason:
                'Our shipping services offer reliability, convenience, and cost-effectiveness. We guarantee on-time delivery, secure tracking, and efficient customer service.',
            },
            {
              title: 'Reliable shipping.',
              reason:
                "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
            },
          ],
          team: [
            {
              id: 'team1',
              name: 'Abigail Bell',
              role: 'IBM',
              picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-1.png',
            },
            {
              id: 'team2',
              name: 'Alex King',
              role: 'eBay',
              picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-2.jpg',
            },
            {
              id: 'team3',
              name: 'Adam King',
              role: 'eBay',
              picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-3.jpg',
            },
            {
              id: 'team4',
              name: 'Mercy Richards',
              role: 'Starbucks',
              picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-4.jpg',
            },
            {
              id: 'team5',
              name: 'Raymond Moses',
              role: 'Starbucks',
              picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-5.png',
            },
            {
              id: 'team6',
              name: 'Jane Miles',
              role: 'Facebook',
              picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-6.png',
            },
          ],
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
        // pagesOrder:[{name:"home", value:"home", includePage: true}, {name:"about", value:"about us",IncludePage: false}, {name:"contact", value:"contact us", includePage: false}]
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
        ourStory:
          'ShopNest was born from a vision to redefine the way you shop online. With years of experience in the eCommerce industry, we set out to create a one-stop destination where you can discover high-quality products, connect with trusted sellers, and enjoy seamless shopping from the comfort of your own nest',
        whyShopWithUs: [
          {
            title: 'Convenience and Ease',
            reason:
              "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
          },
          {
            title: 'Affordable, reliable shipping',
            reason:
              'Our shipping services offer reliability, convenience, and cost-effectiveness. We guarantee on-time delivery, secure tracking, and efficient customer service.',
          },
          {
            title: 'Reliable shipping.',
            reason:
              "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
          },
        ],
        team: [
          {
            id: 'team1',
            name: 'Abigail Bell',
            role: 'IBM',
            picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-1.png',
          },
          {
            id: 'team2',
            name: 'Alex King',
            role: 'eBay',
            picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-2.jpg',
          },
          {
            id: 'team3',
            name: 'Adam King',
            role: 'eBay',
            picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-3.jpg',
          },
          {
            id: 'team4',
            name: 'Mercy Richards',
            role: 'Starbucks',
            picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-4.jpg',
          },
          {
            id: 'team5',
            name: 'Raymond Moses',
            role: 'Starbucks',
            picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-5.png',
          },
          {
            id: 'team6',
            name: 'Jane Miles',
            role: 'Facebook',
            picture: 'https://gitinspired.s3.amazonaws.com/team-3-user-6.png',
          },
        ],
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
    };

    return of(template);
  }
}

     TestBed.configureTestingModule({
      imports: [EcommerceWebsiteComponent, HttpClientTestingModule],
      providers: [{provide: APIService, useClass: MockService}]
    })
    .compileComponents();
    
   
  });

  beforeEach(() => {
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(EcommerceWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
