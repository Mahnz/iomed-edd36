const provinces = [
    'Agrigento',
    'Alessandria',
    'Ancona',
    'Aosta',
    'Arezzo',
    'Ascoli Piceno',
    'Asti',
    'Avellino',
    'Bari',
    'Barletta-Andria-Trani',
    'Belluno',
    'Benevento',
    'Bergamo',
    'Biella',
    'Bologna',
    'Bolzano',
    'Brescia',
    'Brindisi',
    'Cagliari',
    'Caltanissetta',
    'Campobasso',
    'Caserta',
    'Catania',
    'Catanzaro',
    'Chieti',
    'Como',
    'Cosenza',
    'Cremona',
    'Crotone',
    'Cuneo',
    'Enna',
    'Fermo',
    'Ferrara',
    'Firenze',
    'Foggia',
    'Forlì-Cesena',
    'Frosinone',
    'Genova',
    'Gorizia',
    'Grosseto',
    'Imperia',
    'Isernia',
    'L’aquila',
    'La spezia',
    'Latina',
    'Lecce',
    'Lecco',
    'Livorno',
    'Lodi',
    'Lucca',
    'Macerata',
    'Mantova',
    'Massa-Carrara',
    'Matera',
    'Messina',
    'Milano',
    'Modena',
    'Monza e Brianza',
    'Napoli',
    'Novara',
    'Nuoro',
    'Oristano',
    'Padova',
    'Palermo',
    'Parma',
    'Pavia',
    'Perugia',
    'Pesaro e Urbino',
    'Pescara',
    'Piacenza',
    'Pisa',
    'Pistoia',
    'Pordenone',
    'Potenza',
    'Prato',
    'Ragusa',
    'Ravenna',
    'Reggio Calabria',
    'Reggio Emilia',
    'Rieti',
    'Rimini',
    'Roma',
    'Rovigo',
    'Salerno',
    'Sassari',
    'Savona',
    'Siena',
    'Siracusa',
    'Sondrio',
    'Sud Sardegna',
    'Taranto',
    'Teramo',
    'Terni',
    'Torino',
    'Trapani',
    'Trento',
    'Treviso',
    'Trieste',
    'Udine',
    'Varese',
    'Venezia',
    'Verbano-Cusio-Ossola',
    'Vercelli',
    'Verona',
    'Vibo valentia',
    'Vicenza',
    'Viterbo'
];

const departments = [
    'Cardiologia',
    'Ortopedia',
    'Neurologia',
    'Oculistica',
    'Dermatologia',
    'Gastroenterologia',
    'Pediatria',
    'Radiologia',
    'Chirurgia Generale',
    'Oncologia',
    'Psichiatria',
    'Endocrinologia',
    'Urologia',
    'Otorinolaringoiatria (ORL)',
    'Odontoiatria',
    'Ginecologia',
    'Ostetricia',
    'Medicina Interna',
    'Nefrologia',
    'Reumatologia',
    'Ematologia',
    'Allergologia',
    'Cardiologia Pediatrica',
    'Chirurgia Vascolare',
    'Medicina dello Sport',
    'Neonatologia',
    'Nefrologia Pediatrica',
    'Neurochirurgia',
    'Neurologia Pediatrica',
    'Neuroradiologia',
    'Oftalmologia Pediatrica',
    'Ortopedia Pediatrica',
    'Pneumologia',
    'Proctologia',
    'Psicologia Clinica',
    'Psicoterapia',
    'Radiologia Interventistica',
    'Reumatologia Pediatrica',
    'Senologia',
    'Terapia Intensiva',
    'Terapia Intensiva Neonatale',
    'Terapia Intensiva Pediatrica',
    'Urologia Pediatrica',
    'Chirurgia Plastica e Ricostruttiva',
    'Genetica Medica',
    'Malattie Infettive',
    'Medicina Fisica e Riabilitazione',
    'Medicina Nucleare',
    'Medicina Termale',
    'Neuropsichiatria Infantile'
];

const tableData = [
    {
        firstName: "Domenico",
        lastName: "Mazzini",
        birthDate: "23/02/2002",
        CF: "MZZDNC02B23A662Z"
    }, {
        firstName: "Mae",
        lastName: "Kennsley",
        birthDate: "8/20/1964",
        CF: "236-40-5435"
    }, {
        firstName: "Netti",
        lastName: "Bernardelli",
        birthDate: "9/14/1941",
        CF: "441-65-2050"
    }, {
        firstName: "Erich",
        lastName: "Falloon",
        birthDate: "3/22/1968",
        CF: "156-95-2763"
    }, {
        firstName: "Gleda",
        lastName: "Niccolls",
        birthDate: "1/11/1960",
        CF: "831-67-3412"
    }, {
        firstName: "Kerwin",
        lastName: "Scandwright",
        birthDate: "10/23/1902",
        CF: "798-13-2275"
    }, {
        firstName: "Keith",
        lastName: "Ewbach",
        birthDate: "4/30/2010",
        CF: "656-74-3612"
    }, {
        firstName: "Lamont",
        lastName: "Fisby",
        birthDate: "2/23/1943",
        CF: "734-29-4863"
    }, {
        firstName: "Norrie",
        lastName: "Bortolutti",
        birthDate: "8/17/1918",
        CF: "202-56-2417"
    }, {
        firstName: "Lothario",
        lastName: "Sansom",
        birthDate: "7/27/1987",
        CF: "702-38-1392"
    }, {
        firstName: "Louie",
        lastName: "Byne",
        birthDate: "2/3/2003",
        CF: "875-28-5910"
    }, {
        firstName: "Jayme",
        lastName: "Parman",
        birthDate: "7/23/1905",
        CF: "687-89-1768"
    }, {
        firstName: "Johannes",
        lastName: "Millin",
        birthDate: "3/30/1965",
        CF: "344-01-3049"
    }, {
        firstName: "Morton",
        lastName: "Philipson",
        birthDate: "11/3/1933",
        CF: "592-90-3205"
    }, {
        firstName: "Chrisy",
        lastName: "Bastick",
        birthDate: "12/7/1903",
        CF: "543-11-1010"
    }, {
        firstName: "Joshuah",
        lastName: "Rambadt",
        birthDate: "10/18/2000",
        CF: "165-40-4777"
    }, {
        firstName: "Dita",
        lastName: "Vial",
        birthDate: "11/23/1935",
        CF: "193-05-4124"
    }, {
        firstName: "Jacky",
        lastName: "Forsey",
        birthDate: "11/8/1967",
        CF: "535-44-0477"
    }, {
        firstName: "Tish",
        lastName: "Manjot",
        birthDate: "12/17/2001",
        CF: "857-70-1508"
    }, {
        firstName: "Aldon",
        lastName: "Brice",
        birthDate: "3/28/1906",
        CF: "421-42-2773"
    }, {
        firstName: "Bucky",
        lastName: "Stoite",
        birthDate: "11/2/1948",
        CF: "339-11-4753"
    }, {
        firstName: "Chev",
        lastName: "Gillbe",
        birthDate: "9/19/2006",
        CF: "344-81-7616"
    }, {
        firstName: "Hanson",
        lastName: "Butland",
        birthDate: "6/28/1987",
        CF: "584-74-5538"
    }, {
        firstName: "Aharon",
        lastName: "Naptine",
        birthDate: "5/27/1961",
        CF: "340-04-5494"
    }, {
        firstName: "Betsy",
        lastName: "Foli",
        birthDate: "3/2/2006",
        CF: "587-59-8339"
    }, {
        firstName: "Ruperto",
        lastName: "Aimable",
        birthDate: "6/5/1910",
        CF: "819-43-9896"
    }, {
        firstName: "Claribel",
        lastName: "Foxten",
        birthDate: "4/8/1939",
        CF: "169-38-8714"
    }, {
        firstName: "Genevieve",
        lastName: "Lafoy",
        birthDate: "8/10/1906",
        CF: "754-13-2585"
    }, {
        firstName: "Lindi",
        lastName: "Bilsland",
        birthDate: "11/13/1960",
        CF: "275-54-2463"
    }, {
        firstName: "Constantia",
        lastName: "Berthot",
        birthDate: "6/8/1909",
        CF: "421-27-8843"
    }, {
        firstName: "Gianni",
        lastName: "Bromehead",
        birthDate: "3/11/2014",
        CF: "499-34-9944"
    }, {
        firstName: "Steffen",
        lastName: "Mallan",
        birthDate: "7/18/1935",
        CF: "776-16-8022"
    }, {
        firstName: "Louisa",
        lastName: "Maillard",
        birthDate: "10/31/1987",
        CF: "473-84-9024"
    }, {
        firstName: "Yvonne",
        lastName: "Ugolotti",
        birthDate: "9/22/1911",
        CF: "704-58-6173"
    }, {
        firstName: "Rosette",
        lastName: "Kubas",
        birthDate: "5/26/1972",
        CF: "674-30-5716"
    }, {
        firstName: "Dolorita",
        lastName: "Cosh",
        birthDate: "8/6/2015",
        CF: "636-99-2892"
    }, {
        firstName: "Ealasaid",
        lastName: "Archibould",
        birthDate: "2/3/1929",
        CF: "484-39-0267"
    }, {
        firstName: "Iseabal",
        lastName: "Govett",
        birthDate: "5/7/1924",
        CF: "786-23-4325"
    }, {
        firstName: "Rafaello",
        lastName: "Exon",
        birthDate: "11/5/2008",
        CF: "549-73-8623"
    }, {
        firstName: "Ros",
        lastName: "Klugman",
        birthDate: "4/1/1954",
        CF: "479-35-9649"
    }, {
        firstName: "Raffarty",
        lastName: "Gonzales",
        birthDate: "6/27/1958",
        CF: "140-09-4035"
    }, {
        firstName: "Jenna",
        lastName: "Curtin",
        birthDate: "7/4/1960",
        CF: "887-55-2768"
    }, {
        firstName: "Rockey",
        lastName: "Bayley",
        birthDate: "12/15/1919",
        CF: "505-80-9086"
    }, {
        firstName: "Adams",
        lastName: "Btham",
        birthDate: "11/20/1900",
        CF: "408-97-9780"
    }, {
        firstName: "Mallory",
        lastName: "Nicolson",
        birthDate: "4/20/1965",
        CF: "485-66-9366"
    }, {
        firstName: "Granville",
        lastName: "Frampton",
        birthDate: "7/1/1947",
        CF: "305-82-5364"
    }, {
        firstName: "Mavra",
        lastName: "Doding",
        birthDate: "1/13/1931",
        CF: "214-69-5502"
    }, {
        firstName: "Freddi",
        lastName: "Olver",
        birthDate: "8/16/1997",
        CF: "276-52-5153"
    }, {
        firstName: "Winnie",
        lastName: "Durtnel",
        birthDate: "3/13/1929",
        CF: "646-87-4968"
    }, {
        firstName: "Clim",
        lastName: "Hirth",
        birthDate: "9/27/2015",
        CF: "656-51-8887"
    }, {
        firstName: "Marcille",
        lastName: "Schober",
        birthDate: "10/29/1977",
        CF: "823-78-7336"
    }, {
        firstName: "Elsy",
        lastName: "Grayling",
        birthDate: "12/10/1974",
        CF: "706-32-5546"
    }, {
        firstName: "Catrina",
        lastName: "McTaggart",
        birthDate: "10/29/1973",
        CF: "454-04-1627"
    }, {
        firstName: "Waneta",
        lastName: "Mennithorp",
        birthDate: "9/20/1949",
        CF: "298-33-9066"
    }, {
        firstName: "Tiler",
        lastName: "Reichartz",
        birthDate: "1/7/1937",
        CF: "136-20-9117"
    }, {
        firstName: "Louie",
        lastName: "Mityakov",
        birthDate: "3/9/1974",
        CF: "642-73-0115"
    }, {
        firstName: "Libbey",
        lastName: "Wilding",
        birthDate: "5/29/1997",
        CF: "703-76-9028"
    }, {
        firstName: "Patty",
        lastName: "Shorter",
        birthDate: "5/20/1950",
        CF: "380-65-2051"
    }, {
        firstName: "Nike",
        lastName: "Pechan",
        birthDate: "3/4/1929",
        CF: "121-96-4279"
    }, {
        firstName: "Franklin",
        lastName: "Barfitt",
        birthDate: "3/19/1988",
        CF: "444-42-9597"
    }, {
        firstName: "Shirlene",
        lastName: "Sunnucks",
        birthDate: "6/9/1934",
        CF: "696-62-9743"
    }, {
        firstName: "Julie",
        lastName: "Charsley",
        birthDate: "7/12/1970",
        CF: "332-86-0632"
    }, {
        firstName: "Nathalie",
        lastName: "Bremen",
        birthDate: "12/14/1992",
        CF: "486-90-8848"
    }, {
        firstName: "Mandie",
        lastName: "Reburn",
        birthDate: "10/12/1926",
        CF: "802-85-0556"
    }, {
        firstName: "Byrle",
        lastName: "Hatherell",
        birthDate: "12/2/1977",
        CF: "153-45-8233"
    }, {
        firstName: "Johnath",
        lastName: "Davidovics",
        birthDate: "4/11/1962",
        CF: "571-70-6026"
    }, {
        firstName: "Grier",
        lastName: "Desesquelle",
        birthDate: "2/16/1964",
        CF: "742-03-0059"
    }
]

export {provinces, departments, tableData}