<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title> Arqueossítios do NW português</title>
            </head>
            <body>
                <table width="100%" border="1">
                    <tr>
                        <td width="30%" valign="top">
                            <a name="indice"/>
                            <h3>Índice</h3>
                            <ul>
                                <xsl:apply-templates mode="indice" select="//ARQELEM">
                                    <xsl:sort select="IDENTI"/>
                                </xsl:apply-templates>
                            </ul>
                        </td>
                        <td>
                            <xsl:apply-templates select="//ARQELEM">
                                <xsl:sort select="IDENTI"/>
                            </xsl:apply-templates>
                        </td>
                    </tr>
                </table>
                        
            </body>
        </html>
    </xsl:template>
    
    <!-- Templates para o índice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            
            <a href="#{IDENTI}"> <!-- <a href="#n{ATOMIC_NUMBER}"> -->
               
                <xsl:value-of select="IDENTI"/>
                
            </a>
        </li>
        
    </xsl:template>
    
    <xsl:template match="ARQELEM" >
        
        <a name="{IDENTI}"/>  
        <p><b>Identificação</b>: <xsl:value-of select="IDENTI"/></p> 
        <p><b>IMAGEM</b>: <xsl:value-of select="IMAGEM"/></p>
        <p><b>LUGAR</b>: <xsl:value-of select="LUGAR"/></p>
        <p><b>FREGUESIA</b>: <xsl:value-of select="FREGUE"/></p>
        <p><b>CONCELHO </b>: <xsl:value-of select="CONCEL"/></p>
        <p><b>LATITUDE </b>: <xsl:value-of select="LATITU"/></p>
        <p><b>LONGITUDE </b>: <xsl:value-of select="LONGIT"/></p>
        <p><b>ACESSO </b>: <xsl:value-of select="ACESSO"/></p>
        <p><b>QUADRO </b>: <xsl:value-of select="QUADRO"/></p>
        <p><b>DEPOSITADO</b>: <xsl:value-of select="DEPOSI"/></p>
        <p><b>AUTOR</b>: <xsl:value-of select="AUTOR"/></p>
        <p><b>DATA</b>: <xsl:value-of select="DATA"/></p>
       
        <address>[<a href="#indice">Voltar ao índice</a>]</address>
        <center>
            <hr width="80%"/>
        </center>
    </xsl:template>
    
    
</xsl:stylesheet>