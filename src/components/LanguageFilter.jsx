import Button from './UI/Button'


export default function LanguageFilter ({ languages, selectedLanguage, onSelectLanguage }) {
  
        

    return (
        <div className="flex flex-wrap gap-2">

       <Button onClick={() => onSelectLanguage(null)} variant = { selectedLanguage === null ? "primary" : "outline"} >
        All
       </Button>
            
            {languages.map((lang) => (

                <Button onClick={() => onSelectLanguage(lang)} variant = {selectedLanguage === lang ? "primary": "outline"} key={lang}>
                  {lang}
                </Button>

            ))}
        </div>
    );
}