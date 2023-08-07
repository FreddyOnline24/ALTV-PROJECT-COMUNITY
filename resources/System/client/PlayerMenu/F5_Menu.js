import alt from 'alt-client';
import * as ui from '../includes/NativeUI/NativeUi.js';


const menu = new ui.Menu("Dein-Server", "F5 Menu", new ui.Point(10, 100));
const inventar = new ui.UIMenuItem("Inventar", "");
const rechnungen = new ui.UIMenuItem("Rechnungen", "");
const animationen = new ui.UIMenuItem("Animationen", "");
const personalien = new ui.UIMenuItem("Personalien", "");
const fahrzeug = new ui.UIMenuItem("Fahrzeug", "");
const administration = new ui.UIMenuItem("Administration", "");

menu.AddItem(inventar);
menu.AddItem(rechnungen);
menu.AddItem(animationen);
menu.AddItem(personalien);
menu.AddItem(fahrzeug);
menu.AddItem(administration);


function openAnimationMenu() {
    menu.Close();
    menu.Visible = false;
    alt.emit("animationmenu:OpenMenu");
  }
  
  function openInventarMenu() {
    // Implement the logic to open the Inventar menu
  }
  
  function openRechnungenMenu() {
    // Implement the logic to open the Rechnungen menu
  }
  

  function openPersonalienMenu() {
     const PersonalienMenu = new ui.Menu("Dein-Server", "Personalien", new ui.Point(10, 100));
     const Ausweise = new ui.UIMenuItem("Ausweise", "");
     const Geld = new ui.UIMenuItem("Brieftasche", "");
     const Lizenzen = new ui.UIMenuItem("Lizenzen", "");
    
    PersonalienMenu.AddItem(Ausweise);
    PersonalienMenu.AddItem(Geld);
    PersonalienMenu.AddItem(Lizenzen);
    PersonalienMenu.Visible = true;
    PersonalienMenu.Open();

    PersonalienMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof ui.UIMenuItem && item.Text == "Ausweise") {
            openAusweiseMenu();
        }
        else if (item instanceof ui.UIMenuItem && item.Text == "Brieftasche") {
            openGelderMenu();
        }
        else if (item instanceof ui.UIMenuItem && item.Text == "Lizenzen") {
            openLizenzenMenu();
        }
    });

  }
  
  function openFahrzeugMenu() {
    const FahrzeugMenu = new ui.Menu("Dein-Server", "Fahrzeug", new ui.Point(10, 100));
    const Aufschliessen = new ui.UIMenuItem("Aufschliessen", "");
    const Abschliessen = new ui.UIMenuItem("Abschliessen", "");
    const MotorAn = new ui.UIMenuItem("Motor An", "");
    const MotorAus = new ui.UIMenuItem("Motor Aus", "");
    const KofferraumAuf = new ui.UIMenuItem("Kofferraum Auf", "");
    const KofferraumZu = new ui.UIMenuItem("Kofferraum Zu", "");
    const MotorhaubeAuf = new ui.UIMenuItem("Motorhaube Auf", "");
    const MotorhaubeZu = new ui.UIMenuItem("Motorhaube Zu", "");
    const LichtAn = new ui.UIMenuItem("Licht An", "");
    const LichtAus = new ui.UIMenuItem("Licht Aus", "");
    const WarnblinkerAn = new ui.UIMenuItem("Warnblinker An", "");
    const WarnblinkerAus = new ui.UIMenuItem("Warnblinker Aus", "");
        

    FahrzeugMenu.AddItem(Aufschliessen);
    FahrzeugMenu.AddItem(Abschliessen);
    FahrzeugMenu.AddItem(MotorAn);
    FahrzeugMenu.AddItem(MotorAus);
    FahrzeugMenu.AddItem(KofferraumAuf);
    FahrzeugMenu.AddItem(KofferraumZu);
    FahrzeugMenu.AddItem(MotorhaubeAuf);
    FahrzeugMenu.AddItem(MotorhaubeZu);
    FahrzeugMenu.AddItem(LichtAn);
    FahrzeugMenu.AddItem(LichtAus);
    FahrzeugMenu.AddItem(WarnblinkerAn);
    FahrzeugMenu.AddItem(WarnblinkerAus);
    FahrzeugMenu.Visible = true;
    FahrzeugMenu.Open();
  }
  
  function openAdministrationMenu() {
    const AdministrationMenu = new ui.Menu("Dein-Server", "Administration", new ui.Point(10, 100));
    const Spielerliste = new ui.UIMenuItem("Spielerliste", "alle Spieler die online sind");
    const Fahrzeugliste = new ui.UIMenuItem("Fahrzeugliste", "alle Fahrzeuge die gespawnt sind");
    const Banliste = new ui.UIMenuItem("Banliste", "alle gebannten Spieler");
    const Whitelist = new ui.UIMenuItem("Whiteliste", "an/aus");
    const Noclip = new ui.UIMenuItem("Noclip", "an/aus");
    const Godmode = new ui.UIMenuItem("Godmode", "an/aus");
    const Unsichtbar = new ui.UIMenuItem("Unsichtbar", "an/aus");
    const Adminkleidung = new ui.UIMenuItem("Adminkleidung", "an/aus");
    const Supporterkleidung = new ui.UIMenuItem("Supporterkleidung", "an/aus");
    const Developerkleidung = new ui.UIMenuItem("Developerkleidung", "an/aus");

    AdministrationMenu.AddItem(Spielerliste);
    AdministrationMenu.AddItem(Fahrzeugliste);
    AdministrationMenu.AddItem(Banliste);
    AdministrationMenu.AddItem(Whitelist);
    AdministrationMenu.AddItem(Noclip);
    AdministrationMenu.AddItem(Godmode);
    AdministrationMenu.AddItem(Unsichtbar);
    AdministrationMenu.AddItem(Adminkleidung);
    AdministrationMenu.AddItem(Supporterkleidung);
    AdministrationMenu.AddItem(Developerkleidung);
    AdministrationMenu.Visible = true;
    AdministrationMenu.Open();



    AdministrationMenu.ItemSelect.on((item, selectedItemIndex) => {
        if(item == Adminkleidung) {
            alt.emitServer("AdministrationMenu:Adminkleidung");
        } else if(item == Supporterkleidung) {
            alt.emitServer("AdministrationMenu:Supporterkleidung");
        } else if(item == Developerkleidung) {
            alt.emitServer("AdministrationMenu:Developerkleidung");
        }
    });
  }


  function openAusweiseMenu() {
    const AusweiseMenu = new ui.Menu("Dein-Server", "Ausweise", new ui.Point(10, 100));
    const Personalausweis = new ui.UIMenuItem("Personalausweis", "");
    const Dienstausweis = new ui.UIMenuItem("Dienstausweis", "");
    const ReisePass = new ui.UIMenuItem("ReisePass", "");
    const Aufenthaltstitel = new ui.UIMenuItem("Aufenthaltstitel", "");



    AusweiseMenu.AddItem(Personalausweis);
    AusweiseMenu.AddItem(Dienstausweis);
    AusweiseMenu.AddItem(ReisePass);
    AusweiseMenu.AddItem(Aufenthaltstitel);
    AusweiseMenu.Visible = true;
    AusweiseMenu.Open();
  }

  function openGelderMenu() {
    const GelderMenu = new ui.Menu("Dein-Server", "Gelder", new ui.Point(10, 100));
    const Geld = new ui.UIMenuItem("Bargeld", "");
    const Bankgeld = new ui.UIMenuItem("Bankgeld", "");
    GelderMenu.AddItem(Geld);
    GelderMenu.AddItem(Bankgeld);
    GelderMenu.Visible = true;
    GelderMenu.Open();
  }

  function openLizenzenMenu() {
    const LizenzenMenu = new ui.Menu("Dein-Server", "Lizenzen", new ui.Point(10, 100));
    const Füherschein = new ui.UIMenuItem("Füherschein", "");
    const Waffenschein = new ui.UIMenuItem("Waffenschein", "");
    const Flugschein = new ui.UIMenuItem("Flugschein", "");
    const Bootsschein = new ui.UIMenuItem("Bootsschein", "");
    const Angelschein = new ui.UIMenuItem("Angelschein", "");
    const Erstehilfeschein = new ui.UIMenuItem("Erstehilfeschein", "");
    const Personbeförderungsschein = new ui.UIMenuItem("Personbeförderungsschein", "");
    

    LizenzenMenu.AddItem(Füherschein);
    LizenzenMenu.AddItem(Waffenschein);
    LizenzenMenu.AddItem(Flugschein);
    LizenzenMenu.AddItem(Bootsschein);
    LizenzenMenu.AddItem(Angelschein);
    LizenzenMenu.AddItem(Erstehilfeschein);
    LizenzenMenu.AddItem(Personbeförderungsschein);

    LizenzenMenu.Visible = true;
    LizenzenMenu.Open();
  }
  

  menu.ItemSelect.on((item, index) => {
    if (item === inventar) {
      openInventarMenu();
    } else if (item === rechnungen) {
      openRechnungenMenu();
    } else if (item === animationen) {
      openAnimationMenu();
    } else if (item === personalien) {
      openPersonalienMenu();
    } else if (item === fahrzeug) {
      openFahrzeugMenu();
    } else if (item === administration) {
      openAdministrationMenu();
    }
  });
  
  alt.on('keyup', (key) => {
    if (key === 0x74) { // F5 key
      if (menu.Visible) {
        menu.Close();
      } else {
        menu.Open();
      }
    }
  });
  