using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchangelCommunity.WebApi.Logger
{
    /// <summary>
    /// 
    /// </summary>
    public class LoggingEvents
    {
        /// <summary>
        /// 
        /// </summary>
        public const int GENERATE_ITEMS = 1000;

        /// <summary>
        /// 
        /// </summary>
        public const int LIST_ITEMS = 1001;

        /// <summary>
        /// 
        /// </summary>
        public const int GET_ITEM = 1002;

        /// <summary>
        /// 
        /// </summary>
        public const int INSERT_ITEM = 1003;

        /// <summary>
        /// 
        /// </summary>
        public const int UPDATE_ITEM = 1004;

        /// <summary>
        /// 
        /// </summary>
        public const int DELETE_ITEM = 1005;


        /// <summary>
        /// 
        /// </summary>
        public const int GET_ITEM_NOTFOUND = 4000;

        /// <summary>
        /// 
        /// </summary>
        public const int UPDATE_ITEM_NOTFOUND = 4001;
    }
}
