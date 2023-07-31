import { TextField } from "@mui/material";

const Search = ({ search, setSearch }) => {
  return (
        <div className='search'>
            <TextField sx={{ width: '20%' }} name='search' type="text" className="from__input" label="Pesquisar" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Digite o colaborador"/>
        </div>
    );
}

export default Search;