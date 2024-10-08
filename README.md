




# Reas Form Application

Tato aplikace umožňuje uživatelům zadávat poptávky na nemovitosti. Uživatelé mohou zadat typ nemovitosti, vybrat kraj a okres na interaktivní mapě a přidat své kontaktní údaje. Aplikace poté tyto údaje validuje a ukládá na backend.

## Odkazy

- **Frontend**: [https://reas-form.vercel.app/](https://reas-form.vercel.app/)
- **Backend**: [https://reas-form.fly.dev/](https://reas-form.fly.dev/)

## Funkce aplikace

- **Formulář poptávky nemovitosti**: Uživatelé si mohou vybrat typ nemovitosti, kraj a okres na interaktivní mapě a vyplnit kontaktní údaje.
- **Validace formuláře**: Formuláře jsou validovány jak na frontendu pomocí React Hook Form, tak na backendu.
- **Interaktivní mapa Česka**: Uživatelé mohou vybírat kraje a okresy pomocí interaktivní SVG mapy.
- **Zpracování a ukládání dat**: Backend zpracovává a ukládá data do MongoDB Atlas.

## Použité technologie

### Frontend

- **React.js**: Použit pro stavbu uživatelského rozhraní.
- **Context API**: Umožňuje efektivně sdílet stav mezi komponentami.
- **React Hook Form**: Správa a validace formulářů.
- **Styled Components**: Pro styling aplikace s důrazem na responzivitu.
- **Nasazení na Vercel**: Frontend běží na Vercelu.

### Backend

- **Node.js a Express.js**: Zajišťují backendovou logiku a zpracování požadavků.
- **MongoDB a Mongoose**: Ukládání a správa dat v MongoDB Atlas.
- **Nasazení na Fly.io**: Backend je nasazen na Fly.io a propojen s MongoDB Atlas.

## Databázové modely

### LeadModel

Slouží pro ukládání informací o poptávce (jméno, email, telefon, typ nemovitosti).

### RegionModel

Obsahuje informace o krajích, okresech a data potřebná k vykreslení mapy.

## API Endpoints

### 1. Získání typů nemovitostí
GET /api/v1/enums/typ-nemovitosti


### 2. Získání krajů
GET /api/v1/enums/kraje



### 3. Získání okresů podle kraje
GET /api/v1/enums/okresy/



### 4. Odeslání poptávky
POST /api/v1/leads Body: { "firstName": "John", "lastName": "Doe", "email": "john@example.com", "phone": "123456789", "estateType": "Byt", "region": "Hlavní město Praha", "district": "Praha 1" }


## Instalace a spuštění lokálně

### Frontend

1. Přesuňte se do složky `frontend`.
2. Spusťte příkaz `npm install` pro instalaci závislostí.
3. Spusťte aplikaci příkazem `npm run dev`.

### Backend

1. Přesuňte se do složky `backend`.
2. Vytvořte soubor `.env` s následujícím obsahem:
PORT=5000 DATABASE=<MongoDB_URI>


3. Spusťte příkaz `npm install` pro instalaci závislostí.
4. Spusťte server příkazem `npm start`.

## Nasazení

### Frontend

Frontend aplikace je nasazen na Vercelu.

### Backend

Backend je nasazen na Fly.io a propojen s MongoDB Atlas.

## Licence

Tento projekt je licencován pod MIT licencí.
