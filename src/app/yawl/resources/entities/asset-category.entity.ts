
export interface AssetCategory {

	id : string;
	name : string;
	description : string;
    notes : string;
    subCategories : {
        id : number;
        name : string;
    }

}
