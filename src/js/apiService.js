const BASE_URL = 'https://pixabay.com/api';
const API_URL = '24263315-36ea98cb6d0ce52f0b1c6e073';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

 
    fetchImages() {
        return fetch(
            `${BASE_URL}/?key=${API_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`,
        )
        .then(response => response.json())
        .then(({hits}) => {
            this.enlargePage();
            return hits;
        })   
    }

    enlargePage() {
        this.page +=1;
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}