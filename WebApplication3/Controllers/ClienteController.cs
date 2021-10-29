using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Modelo;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly RepositorioClientes repositorioClientes;
        
        public ClienteController()
        {
            repositorioClientes = new RepositorioClientes();
        }
        [HttpGet]
        public IEnumerable<Clientes> Get()
        {
            return repositorioClientes.GetAll();
        }
        [HttpGet("{Codigo}")]
        public Clientes Get(int Codigo)
        {
            return repositorioClientes.GetById(Codigo);
        }
        [HttpPost]
        public void Post([FromBody]Clientes clnts)
        {
            if (ModelState.IsValid)
                repositorioClientes.Add(clnts);
        }
        [HttpPut("{Codigo}")]
        public void Put(int Codigo,[FromBody]Clientes clnts)
        {
            clnts.Codigo = Codigo;
            if (ModelState.IsValid)
                repositorioClientes.Update(clnts);
        }
        [HttpDelete("{Codigo}")]
        public void Delete(int Codigo)
        {
            repositorioClientes.Delete(Codigo);
        }

    }
}
