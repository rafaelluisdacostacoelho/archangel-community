using System.Collections.Generic;
using System.IO;

namespace ArchangelCommunity.WebApi.Emails
{
    /// <summary>
    /// 
    /// </summary>
    public static class EmailWrapper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="template"></param>
        /// <returns></returns>
        public static string CreateEmailBody(Dictionary<string, string> parameters, EmailTemplate template)
        {
            string html = string.Empty;

            using (StreamReader reader = File.OpenText(template.ToString()))
            {
                html = reader.ReadToEnd();
            }

            foreach (KeyValuePair<string, string> parameter in parameters)
            {
                html = html.Replace(parameter.Key, parameter.Value);
            }

            return html;
        }
    }
}
