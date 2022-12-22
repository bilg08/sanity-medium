export type Post = {
	_createdAt:string,
	_id:string,
	title:string,
	author: {
		name: string,
		image: {
			asset: {
				_ref:string
			}
		}
	},
	slug: {
		current:string
	},
	mainImage: {
		asset: {
			_ref:string
		}
	},
	body:any,
	catergories: Category[],
	comments: [{
		comment: string,
		name: string,
		name:string
	}]
}

export type Category = {
	name: string,
	title: string,
	description:string
}