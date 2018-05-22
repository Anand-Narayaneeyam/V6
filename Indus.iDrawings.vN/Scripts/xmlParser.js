XMLParser = function () {

    this.xmlDoc = null;    
    
    this.loadXML = function (xmlString) {
       if (window.DOMParser) {
           parser = new DOMParser();
           xmlDoc = parser.parseFromString(xmlString, "text/xml");
        }
        else // Internet Explorer
        {
           xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
           xmlDoc.async = false;
           xmlDoc.loadXML(xmlString);
        }
    },
    this.getNodeCount = function(nodeName)
    {
        var pNodeList = xmlDoc.getElementsByTagName(nodeName);
        return pNodeList.length;
    },
    this.getNodeList = function (nodeName) {
        var pNodeList = xmlDoc.getElementsByTagName(nodeName);
        return pNodeList;
    }
}