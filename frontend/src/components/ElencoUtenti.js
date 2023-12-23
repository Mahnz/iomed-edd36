// MediciAutorizzati.js
// Creare una tabella che vada a mappare l'array di medici autorizzati relativi ad un certo codice fiscale.
// Ogni riga della tabella deve contenere:
// - Nome e cognome del medico
// - Specializzazione
// - Ospedale di riferimento
// - pulsante per rimuovere il paziente, e richiamare l'api '/api/bc/deleteDoctor'
import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie"
import {
    Paper,
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
    Typography
} from "@mui/material"

export default function ElencoUtenti() {
    const cookies = new Cookies()
    const [medico, setMedico] = useState(false)
    const [users, setUsers] = useState([])
    const [id, setId] = useState('')

    const tableData = [
        {
            firstName: "Myranda",
            lastName: "Mowett",
            birthDate: "4/19/2002",
            codiceFiscale: "288-89-6481"
        }, {
            firstName: "Mae",
            lastName: "Kennsley",
            birthDate: "8/20/1964",
            codiceFiscale: "236-40-5435"
        }, {
            firstName: "Netti",
            lastName: "Bernardelli",
            birthDate: "9/14/1941",
            codiceFiscale: "441-65-2050"
        }, {
            firstName: "Erich",
            lastName: "Falloon",
            birthDate: "3/22/1968",
            codiceFiscale: "156-95-2763"
        }, {
            firstName: "Gleda",
            lastName: "Niccolls",
            birthDate: "1/11/1960",
            codiceFiscale: "831-67-3412"
        }, {
            firstName: "Kerwin",
            lastName: "Scandwright",
            birthDate: "10/23/1902",
            codiceFiscale: "798-13-2275"
        }, {
            firstName: "Keith",
            lastName: "Ewbach",
            birthDate: "4/30/2010",
            codiceFiscale: "656-74-3612"
        }, {
            firstName: "Lamont",
            lastName: "Fisby",
            birthDate: "2/23/1943",
            codiceFiscale: "734-29-4863"
        }, {
            firstName: "Norrie",
            lastName: "Bortolutti",
            birthDate: "8/17/1918",
            codiceFiscale: "202-56-2417"
        }, {
            firstName: "Lothario",
            lastName: "Sansom",
            birthDate: "7/27/1987",
            codiceFiscale: "702-38-1392"
        }, {
            firstName: "Louie",
            lastName: "Byne",
            birthDate: "2/3/2003",
            codiceFiscale: "875-28-5910"
        }, {
            firstName: "Jayme",
            lastName: "Parman",
            birthDate: "7/23/1905",
            codiceFiscale: "687-89-1768"
        }, {
            firstName: "Johannes",
            lastName: "Millin",
            birthDate: "3/30/1965",
            codiceFiscale: "344-01-3049"
        }, {
            firstName: "Morton",
            lastName: "Philipson",
            birthDate: "11/3/1933",
            codiceFiscale: "592-90-3205"
        }, {
            firstName: "Chrisy",
            lastName: "Bastick",
            birthDate: "12/7/1903",
            codiceFiscale: "543-11-1010"
        }, {
            firstName: "Joshuah",
            lastName: "Rambadt",
            birthDate: "10/18/2000",
            codiceFiscale: "165-40-4777"
        }, {
            firstName: "Dita",
            lastName: "Vial",
            birthDate: "11/23/1935",
            codiceFiscale: "193-05-4124"
        }, {
            firstName: "Jacky",
            lastName: "Forsey",
            birthDate: "11/8/1967",
            codiceFiscale: "535-44-0477"
        }, {
            firstName: "Tish",
            lastName: "Manjot",
            birthDate: "12/17/2001",
            codiceFiscale: "857-70-1508"
        }, {
            firstName: "Aldon",
            lastName: "Brice",
            birthDate: "3/28/1906",
            codiceFiscale: "421-42-2773"
        }, {
            firstName: "Bucky",
            lastName: "Stoite",
            birthDate: "11/2/1948",
            codiceFiscale: "339-11-4753"
        }, {
            firstName: "Chev",
            lastName: "Gillbe",
            birthDate: "9/19/2006",
            codiceFiscale: "344-81-7616"
        }, {
            firstName: "Hanson",
            lastName: "Butland",
            birthDate: "6/28/1987",
            codiceFiscale: "584-74-5538"
        }, {
            firstName: "Aharon",
            lastName: "Naptine",
            birthDate: "5/27/1961",
            codiceFiscale: "340-04-5494"
        }, {
            firstName: "Betsy",
            lastName: "Foli",
            birthDate: "3/2/2006",
            codiceFiscale: "587-59-8339"
        }, {
            firstName: "Ruperto",
            lastName: "Aimable",
            birthDate: "6/5/1910",
            codiceFiscale: "819-43-9896"
        }, {
            firstName: "Claribel",
            lastName: "Foxten",
            birthDate: "4/8/1939",
            codiceFiscale: "169-38-8714"
        }, {
            firstName: "Genevieve",
            lastName: "Lafoy",
            birthDate: "8/10/1906",
            codiceFiscale: "754-13-2585"
        }, {
            firstName: "Lindi",
            lastName: "Bilsland",
            birthDate: "11/13/1960",
            codiceFiscale: "275-54-2463"
        }, {
            firstName: "Constantia",
            lastName: "Berthot",
            birthDate: "6/8/1909",
            codiceFiscale: "421-27-8843"
        }, {
            firstName: "Gianni",
            lastName: "Bromehead",
            birthDate: "3/11/2014",
            codiceFiscale: "499-34-9944"
        }, {
            firstName: "Steffen",
            lastName: "Mallan",
            birthDate: "7/18/1935",
            codiceFiscale: "776-16-8022"
        }, {
            firstName: "Louisa",
            lastName: "Maillard",
            birthDate: "10/31/1987",
            codiceFiscale: "473-84-9024"
        }, {
            firstName: "Yvonne",
            lastName: "Ugolotti",
            birthDate: "9/22/1911",
            codiceFiscale: "704-58-6173"
        }, {
            firstName: "Rosette",
            lastName: "Kubas",
            birthDate: "5/26/1972",
            codiceFiscale: "674-30-5716"
        }, {
            firstName: "Dolorita",
            lastName: "Cosh",
            birthDate: "8/6/2015",
            codiceFiscale: "636-99-2892"
        }, {
            firstName: "Ealasaid",
            lastName: "Archibould",
            birthDate: "2/3/1929",
            codiceFiscale: "484-39-0267"
        }, {
            firstName: "Iseabal",
            lastName: "Govett",
            birthDate: "5/7/1924",
            codiceFiscale: "786-23-4325"
        }, {
            firstName: "Rafaello",
            lastName: "Exon",
            birthDate: "11/5/2008",
            codiceFiscale: "549-73-8623"
        }, {
            firstName: "Ros",
            lastName: "Klugman",
            birthDate: "4/1/1954",
            codiceFiscale: "479-35-9649"
        }, {
            firstName: "Raffarty",
            lastName: "Gonzales",
            birthDate: "6/27/1958",
            codiceFiscale: "140-09-4035"
        }, {
            firstName: "Jenna",
            lastName: "Curtin",
            birthDate: "7/4/1960",
            codiceFiscale: "887-55-2768"
        }, {
            firstName: "Rockey",
            lastName: "Bayley",
            birthDate: "12/15/1919",
            codiceFiscale: "505-80-9086"
        }, {
            firstName: "Adams",
            lastName: "Btham",
            birthDate: "11/20/1900",
            codiceFiscale: "408-97-9780"
        }, {
            firstName: "Mallory",
            lastName: "Nicolson",
            birthDate: "4/20/1965",
            codiceFiscale: "485-66-9366"
        }, {
            firstName: "Granville",
            lastName: "Frampton",
            birthDate: "7/1/1947",
            codiceFiscale: "305-82-5364"
        }, {
            firstName: "Mavra",
            lastName: "Doding",
            birthDate: "1/13/1931",
            codiceFiscale: "214-69-5502"
        }, {
            firstName: "Freddi",
            lastName: "Olver",
            birthDate: "8/16/1997",
            codiceFiscale: "276-52-5153"
        }, {
            firstName: "Winnie",
            lastName: "Durtnel",
            birthDate: "3/13/1929",
            codiceFiscale: "646-87-4968"
        }, {
            firstName: "Clim",
            lastName: "Hirth",
            birthDate: "9/27/2015",
            codiceFiscale: "656-51-8887"
        }, {
            firstName: "Marcille",
            lastName: "Schober",
            birthDate: "10/29/1977",
            codiceFiscale: "823-78-7336"
        }, {
            firstName: "Elsy",
            lastName: "Grayling",
            birthDate: "12/10/1974",
            codiceFiscale: "706-32-5546"
        }, {
            firstName: "Catrina",
            lastName: "McTaggart",
            birthDate: "10/29/1973",
            codiceFiscale: "454-04-1627"
        }, {
            firstName: "Waneta",
            lastName: "Mennithorp",
            birthDate: "9/20/1949",
            codiceFiscale: "298-33-9066"
        }, {
            firstName: "Tiler",
            lastName: "Reichartz",
            birthDate: "1/7/1937",
            codiceFiscale: "136-20-9117"
        }, {
            firstName: "Louie",
            lastName: "Mityakov",
            birthDate: "3/9/1974",
            codiceFiscale: "642-73-0115"
        }, {
            firstName: "Libbey",
            lastName: "Wilding",
            birthDate: "5/29/1997",
            codiceFiscale: "703-76-9028"
        }, {
            firstName: "Patty",
            lastName: "Shorter",
            birthDate: "5/20/1950",
            codiceFiscale: "380-65-2051"
        }, {
            firstName: "Nike",
            lastName: "Pechan",
            birthDate: "3/4/1929",
            codiceFiscale: "121-96-4279"
        }, {
            firstName: "Franklin",
            lastName: "Barfitt",
            birthDate: "3/19/1988",
            codiceFiscale: "444-42-9597"
        }, {
            firstName: "Shirlene",
            lastName: "Sunnucks",
            birthDate: "6/9/1934",
            codiceFiscale: "696-62-9743"
        }, {
            firstName: "Julie",
            lastName: "Charsley",
            birthDate: "7/12/1970",
            codiceFiscale: "332-86-0632"
        }, {
            firstName: "Nathalie",
            lastName: "Bremen",
            birthDate: "12/14/1992",
            codiceFiscale: "486-90-8848"
        }, {
            firstName: "Mandie",
            lastName: "Reburn",
            birthDate: "10/12/1926",
            codiceFiscale: "802-85-0556"
        }, {
            firstName: "Byrle",
            lastName: "Hatherell",
            birthDate: "12/2/1977",
            codiceFiscale: "153-45-8233"
        }, {
            firstName: "Johnath",
            lastName: "Davidovics",
            birthDate: "4/11/1962",
            codiceFiscale: "571-70-6026"
        }, {
            firstName: "Grier",
            lastName: "Desesquelle",
            birthDate: "2/16/1964",
            codiceFiscale: "742-03-0059"
        }
    ]

    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("type") === "medico") {
                setMedico(true)
                // TODO - Da rimuovere quando il codice fiscale viene letto dal cookie
                setId('A4S5S8W9Q5A4S8W5D8')
                // setId(cookies.get('id'))
                // BLOCKCHAIN
                // const response = await axios.get(`http://localhost:3001/api/bc/getAllDoctorsByCF/${codiceFiscale}`)
                // setUsers(response.data.medici)
            } else {
                setMedico(false)
                // TODO - Da rimuovere quando il codice fiscale viene letto dal cookie
                // const codiceFiscale = 'MZZDNC02B23A662Z'
                // const codiceFiscale = cookies.get('token')
                // BLOCKCHAIN
                // const response = await axios.get(`http://localhost:3001/api/bc/getAllDoctorsByCF/${codiceFiscale}`)
                // setUsers(response.data.medici)
            }
        }
    }, [])

    return (
        <>
            <Typography variant="h4" mb={4}>
                {medico ? "Elenco assistiti" : "Elenco dei medici autorizzati"}
            </Typography>
            <TableContainer component={Paper} sx={{maxHeight: 700}}>
                <Table aria-label="table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cognome</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Data di nascita</TableCell>
                            <TableCell align="center">Codice fiscale</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, index) => (
                            <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{row.lastName}</TableCell>
                                <TableCell component="th" scope="row">{row.firstName}</TableCell>
                                <TableCell align="center">{row.birthDate}</TableCell>
                                <TableCell align="center">{row.codiceFiscale}</TableCell>
                                <TableCell align="right"> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}