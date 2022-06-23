

module.exports = class ClassFunction {
    constructor(Model, Request, Response, Next) {
        this.ModelSchema = Model;
        this.request = Request;
        this.response = Response;
        this.next = Next
    }


    // @description: Create files, update files, delete files;
    async CreateFile(check) {
        const Model = this.ModelSchema;
        const req = this.request;
        const res = this.response;
        const next = this.next;

        const body = req.body;
        const { filename } = req.file
        const files = req.files

        if(check == "1") {
            const filesOne = new Model({

            })
        }

        if(check == "2") {
            const filesTwo = new Model({
                
            })
        }
    }


    async Random() {
        
    }










}