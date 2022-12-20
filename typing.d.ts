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
	catergories:Category[]
}

export type Category = {
	name: string,
	title: string,
	description:string
}