const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "e2batch"
});

app.get('/', (req, res) => {

res.send(` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="forms">
        <form action="/books/insert" method="post">
          <div>
            <label for="ID">ID of the book:</label>
            <input type="number" name="ID" value="" id="ID">
          </div>
          <div>
            <label for="title">Tilte of the book:</label>
            <input type="text" name="title" value="" id="title">
          </div>
           <div>
            <label for="author_ID">author ID of the book:</label>
            <input type="text" name="author_ID" value="" id="author_ID">
        </div>
        <div>
            <label for="author_Name">author of the book:</label>
            <input type="text" name="author_Name" value="" id="author_Name">
        </div>
        <div>
            <label for="author_bio">author_bio:</label>
            <input type="text" name="author_bio" value="" id="author_bio">
        </div>
        <div>
            <label for="published_year">Published year of the book:</label>
            <input type="number" name="published_year" value="" id="published_year">
        </div>
        <div>
            <label for="quantity_ava">Number of the book copies:</label>
            <input type="text" name="quantity_ava" value="" id="quantity_ava">
        </div>
        <div>
            <input type="submit" value="ADD BOOK">
        </div>
        </form>

         <div>
           <form action="/books/view" method="get">
            <input type="submit" value="View Books">
           </form>
        </div>
    
         <div >
           <form action="/books/updateQuantity" method="post">
           <div>
            <label for="ID">ID of the book:</label>
            <input type="number" name="ID" value="" id="ID">
          </div>
           <div>
            <label for="quantity_ava">Number of the book copies:</label>
            <input type="text" name="quantity_ava" value="" id="quantity_ava">
           </div>
            <input type="submit" value="Update quantity">
           </form>
        </div>

        <div>
           <form action="/books/delete" method="post">
           <div>
            <label for="ID">ID of the book:</label>
            <input type="number" name="ID" value="" id="ID">
           </div>
            <input type="submit" value="DELETE BOOK">
           </form>
        </div>
    </div>
</body>
</html>
     `)

});



app.get('/books/view', (req, res) => {
    const sql = `
        SELECT book.id, book.title, author_name
        FROM book, authors
        WHERE book.authid = authors.author_id;
    `;
             
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving books:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const tableRows = result.map(book => `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author_name}</td>
            </tr>
        `);
        const htmlResponse = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h2>Books</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows.join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlResponse);
    });
});

// app.get('/books/view', (req, res) => {
//     const sql = `
//         SELECT book.id, book.title, author_name
//         FROM book,authors where book.authid = authors.author_id;
//     `;

//     con.query(sql, (err, result) => {
//         if (err) {
//             console.error('Error retrieving books:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }

//         res.json(result);
//     });
// });


app.post('/books/insert', (req, res) => {
    console.log(req.body);
    const { ID, title, author_ID, author_Name, author_bio, published_year, quantity_ava } = req.body;
    const authorCheckQuery = `SELECT * FROM authors WHERE author_name="${author_Name}"`;
    con.query(authorCheckQuery, [author_Name], (error, authorResult) => {

        if (error) {
            throw error;
        }
        console.log(authorResult.length);
        if (authorResult.length === 0) {
            const inserquery = `INSERT INTO authors VALUES (${author_ID},'${author_Name}','${author_bio}')`;
            con.query(inserquery, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    insertBook(ID, title, author_ID, published_year, quantity_ava, res);
                }
            });
        } else {
            insertBook(ID, title, author_ID, published_year, quantity_ava, res);
        }
    })
})

function insertBook(ID, title, author_ID, published_year, quantity_ava, res) {
    const query = `INSERT INTO book VALUES(${ID},'${title}',${author_ID},${published_year},${quantity_ava})`;
    con.query(query, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
}



app.post('/books/updateQuantity', (req, res) => {
    console.log(req.body);
    const { ID, quantity_ava } = req.body;

    const updateQuantityQuery = `
        UPDATE book
        SET quantityavailable = ${quantity_ava}
        WHERE id = ${ID};
    `;

    con.query(updateQuantityQuery, [quantity_ava, ID], (err, result) => {
        if (err) {
            console.error('Error updating quantity:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json({ message: 'Quantity updated successfully' });
    });
});

app.post('/books/delete', (req, res) => {
    const { ID } = req.body;

    const deleteBookQuery = `DELETE FROM book WHERE id = ${ID}`;

    con.query(deleteBookQuery, [ID], (err, result) => {
        if (err) {
            console.error('Error deleting book:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json({ message: 'Book deleted successfully' });
    });
});

app.listen(3000);