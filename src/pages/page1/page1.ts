import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MovieService} from '../../providers/MovieService';
import { Platform, ActionSheetController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [MovieService]
})


export class Page1 {
  movies: Array<any>;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private MovieService: MovieService, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
       this.presentLoading()
       this.loadPeople();
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Loading...',
      duration: 7000,
      dismissOnPageChange: true
    }).present();
}


  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Buy Ticket',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            let toast = this.toastCtrl.create({
			      message: 'Go to ticket counter',
			      duration: 3000,
			      position: 'top'
			    });
			    toast.present();
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
}

  loadPeople()
  {
            this.MovieService.getmovies().subscribe(
                data => {
                    this.movies = data.results; 
                    console.log(JSON.stringify(data.results));
                },
                err => {
                    console.log(err);
                },
                () => console.log('Movie loaded Complete')
            );
        }
  }
