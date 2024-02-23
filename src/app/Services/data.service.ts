import { Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/all-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  merchantDashboardNoProjects: boolean = false;
  doesNotExist = {exist: false, term:''}
  isMobileBool: boolean = false;
  isEditable: boolean = false;
  loginCredentials:UserCredentials = {email:'', password:''}
  ecommerceWebsite: string= ''
  businessId: string = ''
  storeId: string =''
  showInputLink: boolean = false;
  inputLinkVisibility: { [key: number]: boolean } = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };
  urls: { [key: number]: string } = {
    1: 'assets/images/ecommerce-home-dresses.svg',
    3: 'assets/images/ecommerce-home-tops.svg',
    4: 'assets/images/ecommerce-home-accesories.svg',
    5: 'assets/images/ecommerce-home-sneakers.svg',
    6: 'assets/images/ecommerce-home-two-ladies.svg',
  };
  products:any = []


  template ={
    id: "template-1",
    screenshot: "https://gitinspired.s3.amazonaws.com/shopNest.png",
    text: "ShopNest",
    fontFamily: "Inter",
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: 400,
    primaryColor: "#121212",
    secondaryColor: "#b1b",
    primaryBackground: "#f5f5f5",
    secondaryBackground: "#0c0404",
    primaryAccentBackground: "#000000",
    secondaryAccentBackground: "#000000",
    primaryAccentColor: "#000000",
    secondaryAccentColor: "#00000017",
    headings: {
        heroHeading: {
            text: "level up your style with our summer collections",
            color: "#1C222B",
            fontSize: "72px",
            lineHeight: "90px",
            fontWeight: 700
        },
        aboutHeading: {
            text: "level up your style with our summer collections",
            color: "#1C222B",
            paragraph: "  ",
            fontSize: "72px",
            lineHeight: "90px",
            fontWeight: 700
        },
        contactHeading: {
            text: "CONTACT US",
            color: "#1C222B",
            fontSize: "72px",
            lineHeight: "90px",
            fontWeight: 700
        }
    },
    includePage: {
        about: false,
        contact: false
    },
    buttons: {
        borderColor: "#000000",
        borderRadius: "1px",
        color: "#FFFFFF",
        backgroundColor: "#000000"
    },
    images: {
        heroImage: "https://storefront-gh-media.s3.eu-west-1.amazonaws.com/STRFRNTSMES-1708683639373-step_3.png",
        promoImage: "https://gitinspired.s3.amazonaws.com/promoImage.png",
        aboutHeroImage: "https://gitinspired.s3.amazonaws.com/aboutUsHero.jpg",
        aboutFooterImage: "https://gitinspired.s3.amazonaws.com/aboutFooterImage.jpg",
        ContactImage: "https://gitinspired.s3.amazonaws.com/contactUsImage.png"
    },
    aboutUs: {
        ourStory: "ShopNest was born from a vision to redefine the way you shop online. With years of experience in the eCommerce industry, we set out to create a one-stop destination where you can discover high-quality products, connect with trusted sellers, and enjoy seamless shopping from the comfort of your own nest",
        whyShopWithUs: [
            {
                title: "Convenience and Ease",
                reason: "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks."
            },
            {
                title: "Affordable, reliable shipping",
                reason: "Our shipping services offer reliability, convenience, and cost-effectiveness. We guarantee on-time delivery, secure tracking, and efficient customer service."
            },
            {
                title: "Reliable shipping.",
                reason: "Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks."
            }
        ],
        team: [
            {
                id: "team1",
                name: "Abigail Bell",
                role: "IBM",
                picture: "https://gitinspired.s3.amazonaws.com/team-3-user-1.png"
            },
            {
                id: "team2",
                name: "Alex King",
                role: "eBay",
                picture: "https://gitinspired.s3.amazonaws.com/team-3-user-2.jpg"
            },
            {
                id: "team3",
                name: "Adam King",
                role: "eBay",
                picture: "https://gitinspired.s3.amazonaws.com/team-3-user-3.jpg"
            },
            {
                id: "team4",
                name: "Mercy Richards",
                role: "Starbucks",
                picture: "https://gitinspired.s3.amazonaws.com/team-3-user-4.jpg"
            },
            {
                id: "team5",
                name: "Raymond Moses",
                role: "Starbucks",
                picture: "https://gitinspired.s3.amazonaws.com/team-3-user-5.png"
            },
            {
                id: "team6",
                name: "Jane Miles",
                role: "Facebook",
                picture: "https://gitinspired.s3.amazonaws.com/team-3-user-6.png"
            }
        ]
    },
    contactUs: {
        contactMessage: "",
        phone: "+1012 3456 789",
        email: "demo@gmail.com",
        location: "132 Dartmouth Street Boston, Massachusetts 02156 United States"
    }
}
  constructor() { }
}
