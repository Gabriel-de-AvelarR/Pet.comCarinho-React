
var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

var app=Express();
app.use(cors());
var CONNECTION_STRING="mongodb+srv://user:DADecglgutxsPjVj@loja.itjtjcg.mongodb.net/?retryWrites=true&w=majority"


var DATABASENAME = "loja";
var database;

app.listen(5038, ()=>{
    Mongoclient.connect(CONNECTION_STRING,(error, client)=>{
        database = client.db(DATABASENAME)
        console.log("Conexao bem sucedida")
    })
})

app.get('/api/loja/GetNotes', (request, response)=>{
database.collection("produtos").find({}).toArray((error,result)=>{
    response.status(200).send(result);
    });
})

app.post('/api/loja/AddNotes',multer().none(),(request, response)=>{ 
    database.collection("produtos").count({}, function(error, numOfDocs) {
        database.collection("produtos").insertOne({
            id: (numOfDocs+1).toString(),
            description: request.body.newNotes
        });
        response.json ("Adicionado com sucesso");    
    })
})

app.put('/api/loja/UpdateProduct/:id', async (request, response) => {
    const productId = request.params.id;

    try {
        const { prod } = request.body; // Ajuste para o nome correto do parâmetro
        // Lógica de atualização do produto usando 'prod'
        const result = await updateProduct(productId, prod);

        if (result.success) {
            response.status(200).json({ message: 'Product updated successfully' });
        } else {
            response.status(500).json({ message: 'Failed to update product' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('api/loja/DeleteNotes', (request, reponse)=>{
    databasecollection("produtos").deleteOne({
        id:request.query.id
    });
    reponse.json("Deletado com sucesso")
})


