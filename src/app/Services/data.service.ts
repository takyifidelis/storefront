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
  productCategory:any = []
  templateImages = {
    heroImage: "/assets/images/shopping-image.jpeg",
    promoImage: "assets/images/ecommerce-home-two-ladies.svg",
    aboutHeroImage: "https://gitinspired.s3.amazonaws.com/aboutUsHero.jpg",
    aboutFooterImage: "https://gitinspired.s3.amazonaws.com/aboutFooterImage.jpg",
    ContactImage: "https://gitinspired.s3.amazonaws.com/contactUsImage.png"
}
  template ={
    id: "template-1",
    screenshot: "/assets/images/Text.svg",
    text: "ShopNest",
    fontFamily: "Inter",
    fontArray: ["Inter","Roboto", "Anta", "Helvetica", "sans-serif","Kode Mono", "monospace"],
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: 400,
    primaryColor: "red",
    secondaryColor: "#b1b",
    primaryBackground: "#f5f5f5",
    secondaryBackground: "#0c0404",
    primaryAccentBackground: "#000000",
    secondaryAccentBackground: "#000000",
    primaryAccentColor: "#000000",
    secondaryAccentColor: "#00000017",
    textAlign:"center",
    headings: {
        heroHeading: {
            btnText: "SHOP NOW",
            text: "level up your style with our summer collections",
            styles:{
                color: "yellow",
                fontSize: "72px",
                lineHeight: "90px",
                fontWeight: 700
            },
            bgImage:{
                background: `linear-gradient(148deg,rgba(255, 255, 255, 0.5) 54.97%,rgba(255, 255, 255, 0) 109.02%),url(${this.templateImages.heroImage}), lightgray 50% / cover no-repeat`,
                backgroundSize: "cover",
                width: "100%",
                height: "50rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }

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
        },
        
    },
    sectionTwo:{
        twoSection:{
          image:"assets/images/ecommerce-home-two-ladies.svg",text:{discount:"UPTO 40% OFF",otherText:"Special offers and great deals"}
        }
      },
    sectionThree:{
    name:"Featured Items",
    // products:[
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    //     {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
    // ],
    twoSection:{
        image:"assets/images/ecommerce-home-two-ladies.svg",text:{discount:"UPTO 40% OFF",otherText:"Special offers and great deals"}
    }
    },
    includePage: {
        about: false,
        contact: false
    },
    buttons: {
        borderColor: "red",
        borderRadius: "1px",
        color: "blue",
        backgroundColor: "pink",
        padding:"1rem 3rem"
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
