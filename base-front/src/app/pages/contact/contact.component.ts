import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  successMessage = '';
problemOptions = [
  'Problème de connexion',
  'Problème d\'affichage',
  'Lien cassé ou erreur 404',
  'Fonctionnalité ne fonctionne pas',
  'Données manquantes ou incorrectes',
  'Autre bug technique'
];

formData = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  probleme: '',
  sujet: '',
  message: ''
};


  sendEmail() {
    emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplateId,
      this.formData,
      environment.emailjsPublicKey
    ).then(() => {
      this.successMessage = 'Votre message a bien été envoyé ! Merci 🙌';
this.formData = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  probleme: '',
  sujet: '',
  message: ''
};

    }, (err) => {
      alert('Erreur lors de l’envoi : ' + JSON.stringify(err));
    });
  }
}
