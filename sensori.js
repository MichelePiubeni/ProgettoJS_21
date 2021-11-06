class sensori {
  constructor(name, parametri) {
    this.name = name
    this.parametri = parametri
  }
}

class Date {

  constructor(name,category,area,instructions,thumbnail) {
    this.name = name
    this.category = category
    this.area = area
    this.instructions = instructions
    this.thumbnail = thumbnail

    this.category = []
    this.tags = []
  }

  AddTag(tag) {
    this.tags.push(tag)
  }

  AddSensori(sensori) {
    this.sensori.push(sensori)
  }
}

function JSONToData(jsonObject) {
  const {strMeal: name, 
    strCategory: category,
    strArea: area,
    strInstructions: instructions,
    strThumbnail: thumbnail,
    strTags
  } = jsonObject // destructuring

  const data = new Datw(name, category, area, instructions, thumbnail)

  if (strTags) {
    const tags = strTags.split(",")
    for(const tag of tags){
      meal.AddTag(tag)
    }
  }

  console.log(date)
  return date
}
