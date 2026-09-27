console.log(' ahmed')
const express =require('express')
const app =express()
const port = 5000
const fs =require ('fs')
app.use(express.json())




app.post('/createFolder',(req,res)=>{
const folderName=req.body.folderName
if(!folderName){
    return res.status({massege:'folderName is required'})

}


 fs.mkdir(`./${folderName}`,(err)=>{
    if(err){
        console.log(err);
        return res.status(500).json({ massege: 'error creating folder', error: err.message })
            return res.status(201).json({ massege: 'folder created successfully' })

        
    }else{
        console.log('folder cerated');
         return res.status(201).json({ massege: 'folder created successfully' })
 
        
    }
})
})


app.delete('/deletFolder',(req,res)=>{
    const fileName =req.body.folderName
    if(!fileName){
    return res.status({massege:'folderName is required'})
    }
    fs.rm(`./${fileName}`,{recursive: true},(err)=>{
        if (err){
            console.log(err);
            return res.status(500).json({ massege: 'error deleting folder', error: err.message })
            
        }else{
            console.log('folder created');
             return res.status(200).json({ massege: 'folder deleted successfully' })

        }
    })
})


app.post('/createFile', (req, res) => {
    const fileName = req.body.fileName
    const data = req.body.data

    if (!fileName) {
        return res.status(400).json({ massege: 'fileName is required' })
    }

    try {
        fs.writeFileSync(`./${fileName}.txt`, data || '')
        console.log('file created')
        return res.status(201).json({ massege: 'file is created successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ massege: 'error creating file', error: err.message })
    }
})

app.put('/editFile', (req, res) => {
    const fileName = req.body.fileName
    const data = req.body.data

    if (!fileName) {
        return res.status(400).json({ massege: 'fileName is required' })
    }

    try {
        fs.writeFileSync(`./${fileName}.txt`, data || '')
        console.log('file updated')
        return res.status(200).json({ massege: 'file is updated successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ massege: 'error updating file', error: err.message })
    }
})



app.delete('/deleteFile', (req, res) => {
    const fileName = req.body.fileName

    if (!fileName) {
        return res.status(400).json({ massege: 'fileName is required' })
    }

    try {
        fs.unlinkSync(`./${fileName}.txt`)
        console.log('file deleted')
        return res.status(200).json({ massege: 'file is deleted successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ massege: 'error deleting file', error: err.message })
    }
})



app.get('/readFile', (req, res) => {
    const fileName = req.body.fileName

    if (!fileName) {
        return res.status(400).json({ massege: 'fileName is required' })
    }

    try {
        const content = fs.readFileSync(`./${fileName}.txt`, 'utf8')
        console.log('file read')
        return res.status(200).json({ massege: 'file read successfully', content: content })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ massege: 'error reading file', error: err.message })
    }
})



app.put('/updateFileInFolder', (req, res) => {
    const { folderName, fileName, content } = req.body
 
    if (!folderName || !fileName) {
        return res.status(400).json({ message: 'folderName and fileName are required' })
    }
 
    const filePath = `./${folderName}/${fileName}.txt`
 
    fs.access(filePath, fs.constants.F_OK, (accessErr) => {
        if (accessErr) {
            return res.status(404).json({ message: 'file not found' })
        }
 
        fs.writeFile(filePath, content || '', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'error updating file', error: err.message })
            }
 
            console.log('file updated');
            return res.status(200).json({ message: 'file updated successfully' })
        })
    })
})
 


app.listen(port, _=>console.log(`server started at port ${port}`))
