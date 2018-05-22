using System.Web.Mvc;
using System.Linq;

namespace Models.ViewModel
{
    public class JSONReturnVM<T> 
        where T : class
    {
        public JSONReturnVM(T element)
        {
            this.element = element;
        }

        public JSONReturnVM(T element, ModelStateDictionary modelstate)
        {
            this.element = element;
            this.haserror = !modelstate.IsValid;
            this.errormessage = this.GetStateError(modelstate);
        }

        public string GetStateError(ModelStateDictionary modelstate)
        {
            if (!modelstate.IsValid)
            {
                return string.Join(".", modelstate.SelectMany(s => s.Value.Errors).Select(s => s.ErrorMessage));
            }

            return string.Empty;
        }

        public T element { get; set; }
        public bool haserror { get; set; }
        public string errormessage { get; set; }
    }
}