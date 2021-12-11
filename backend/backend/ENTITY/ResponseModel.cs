using LifeGuideProject.API.DATA.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.ENTITY
{
    public class ResponseModel
    {
        public ResponseModel(ResponseCode responseCode, string responseMessage, object dateSet)
        {
            ResponseCode = responseCode;
            ResponseMessage = responseMessage;
            DateSet = dateSet;
        }
        public ResponseCode ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        public object DateSet { get; set; }

    }
}
