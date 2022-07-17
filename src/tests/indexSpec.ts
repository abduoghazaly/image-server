import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('image API get', () => {
    it('Error Massage if no image name ', async () => {
        const response = await request.get('/image');
        expect(response.text).toBe('please select image.');
    })

    it('image not there Error ', async () => {
        const response = await request.get('/image').query({image:'404.png'});
        expect(response.text).toBe('file not exist!');
    })
    it('image without ext Error ', async () => {
        const response = await request.get('/image').query({image:'4-2'});
        expect(response.text).toBe('file not exist!');
    })
    it('NaN width ', async () => {
        const response = await request.get('/image').query({image:'4-2.png',height:300,width:'300px'});
        expect(response.text).toBe('width should be Number Only!');
    })
    it('NaN height', async () => {
        const response = await request.get('/image').query({image:'4-2.png',height:'300px',width:300});
        expect(response.text).toBe('height should be Number Only!');
    })


    it('accept only image name ', async () => {
        const response = await request.get('/image').query({image:'4-2.png'});
        expect(response.type).toBe('image/png');
    })
    it('accept only image name and height', async () => {
        const response = await request.get('/image').query({image:'4-2.png',height:300});
        expect(response.type).toBe('image/png');
    })
    it('accept only image name and width', async () => {
        const response = await request.get('/image').query({image:'4-2.png',width:300});
        expect(response.type).toBe('image/png');
    })
    it('accept image name, height and width', async () => {
        const response = await request.get('/image').query({image:'4-2.png',height:300,width:300});
        expect(response.type).toBe('image/png');
    })

});