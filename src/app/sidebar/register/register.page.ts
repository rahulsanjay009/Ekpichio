import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
declare var RazorpayCheckout:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
//razor_secret=HRrxX8Rhb3b3K3Wurle0UHkf
export class RegisterPage implements OnInit {
  registrationForm:any={}
  err:string=""
  paymentAmount:number=100
  currency="INR"
  currencyIcon="₹"
  razor_key="rzp_test_tKmGlTQpVe7iyL"
  location=['online','offline']
  constructor(private us:UserService,private alrt:AlertController) { }

  ngOnInit() {
  
  }
  call(){
    console.log(this.registrationForm.paymentMode)
  }
  createCode(){
    this.registrationForm.paymentAmount=this.paymentAmount
    
    if(this.registrationForm.paymentMode=="offline")
        this.alrt.create({message:"please go to the desk"}).then((k)=>{k.present()})
    else
    {
    //this.us.addUser(this.registrationForm).subscribe(()=>{console.log("added ....")})
    //this.paywithRazor()    
    console.log(this.registrationForm)       
    }     
    
  }   
  check(x){   
    console.log(x)  
    if(x==""||x==null||x==undefined){   
          this.err="Enter all the fields"   
    }
  }
  paywithRazor(){
    var k=this.us;
    var j=this.registrationForm;
    var paymentAmount=this.paymentAmount
    var options = {
      description: 'Payment',
      image: 'https://res.cloudinary.com/dmm4awbwm/image/upload/v1591517273/favicon_pbwxru.jpg', 
      currency: this.currency, // your 3 letter currency code
      key: this.razor_key, // your Key Id from Razorpay dashboard
      amount: this.paymentAmount, // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Ekpichio',
      prefill: {
        email: this.registrationForm.email,
        contact: this.registrationForm.phone,
        name: this.registrationForm.name
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };
    
    var successCallback = function (payment_id) {
      j.payment_id=payment_id
      j.paymentAmount=paymentAmount
      j.paid=true
      
      k.addUser(j).subscribe(()=>{console.log("added ....")})
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = function (error) {      
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
    
  }
}
