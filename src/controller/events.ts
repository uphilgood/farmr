import { Request, ResponseToolkit } from "@hapi/hapi";
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import * as fs from "fs";
import { get } from "lodash";

export interface IEvents {
    date: Date;
    name: string;
    returnEmailAddress: string;
    body: string;
    method: string;
    messageId: string
}

const config = {
    "type": "service_account",
    "project_id": "farmr-1596640961394",
    "private_key_id": "18910fdf2f067a1a79702ccbada0b97d3f0d29e9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQDb9gNHr+TmHTfS\n8lzqA6yBEaKRKWoGW34d2T+YBvYJdLCeS3v9DXxu4XCIlQBBUJ12WEVYgEg/wMsb\n5LvIz+d3k9R11skFTfifOTBlnHGu9doIHoirUuUIX5BWoH6I0yoK4yjv5OmbFeAy\n9bRqOxVHCSC39oYdfe5RealT+9JW8M2LXbNBLit+cg21vzkB3m3uns5SDjEGdqeG\nbdtDKvBO8GSI1hre/roCRWZvhLXxU2wY2ap55apw3Iu8a/tli92QNnaBKag5OA1G\nVUKfDb35UQdvko1uogVUxNhKAiEYOsOX2F8dvKoIDhRzn9IXMp2Ab7T+E2w8bF/m\nw4JjBb4jAgMBAAECggEAKF22bmJ2NFCqXPkDWiLAdpNA7TjXb0E9HMcwp3qnjkau\n3u3lXCQscMDIgRgvCs17iCtc1of8Ok7sNzs7xvd4d/ZWKCX5kBKmDLpXCl6ycjRG\nBfVsiVxWEbpP58XeUsfF0GetrJCq2j4ifdefe1tKZVXkfj4skJ76rFMSYwo0qKWD\nRGeZedHADqum6UGi2asjYqHAEXUljFKzzb+pKkSiJhrR16+U5R5FnTGA2AMEcE1K\nxiAdtzPYmXEI5Ny/Pm8hnvr3IfN2Z8keUF3b3lo8nE7DLtGHzWMHmvEFOI7R5iMd\nJJUi+XNbbEqXLppYeMGubPaa6C+GT9JU1YFo8aJOWQKBgQDy2xoBfShI7IkEu3Sx\npQ9ITtmARNlUNSeIL0FrTdBWj4WlJCNPmi9ETTSHWYlERakOHaGpi/pPyLXnBwrw\n8tl+jd1lGuCR/f1xWfA7IKLN2wYmjB37tFG56zDeSpXtdqntHxBhGnWj/4HrzHp7\nnNHOP9Fx4kdhWqLcEQihcZ6PnwKBgQDn3bC+BGgZQ7wsnInUUv8v43oRNp+WcB1K\nXr3Gsramt1RFdadk2YHGDMfckC9UDkPwoQ5UgrFQHUripr4I3npui5ALvUmnagDR\nJeIInhEirlK47GFK7yXPGyYuy2vk2sfgP49ccZ02BKxahUT818aB7hKW/7vP+lDK\nkeNaoYNy/QKBgHaHPTAQ18KPv2gR3ah+OPE/mqQh9jhFISA0gCdQ+SfmMIIjGyDU\nzdD2JXcR2g76OMJs7+QCL48VFMLHCy4COOitcKrR7V0Tq8jQ7pDNIuh5x4y0wkWB\nAopNIbK8kGQvkEvs51+dPGFoaQ6e5ADEzxlsyFpe6Bu50ta5cY7qF0tdAn9/tJqk\nDclIIQaDi7RePVhQB/ozgOJk+VsomwXraoMvT8oad7K62RGhA2kRElj+8tx4rDw4\nT8NZXMjiDPSd7euA911fGeJ3UusgRr04AdduQpVNRORRYWZxq4JcQ64pXla4LEnJ\noMn19pz3Pm/A0xeCeJ3EjRXkdvoImFGgmVTNAoGAe7FAnyWCPuHBF+vATdCZDEgq\ndmLP6sDcDhafXyDdI/7jA8pw5c51n+WtKKiR/xPe/LiR+lFlFnJAfx70VSV2o/Oz\ny1OrefmPwnEEdK4xHODACvzBIgEewk8DE3Ee2Fw+iLakdCZUvUkQEzYKNtPfzy7x\ncx2Gu48PVm1nyflfefU=\n-----END PRIVATE KEY-----\n",
    "client_email": "farmr-server@farmr-1596640961394.iam.gserviceaccount.com",
    "client_id": "103737515460426355188",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/farmr-server%40farmr-1596640961394.iam.gserviceaccount.com"
  }

export const postEvents = async (r: Request, h: ResponseToolkit): Promise<any> => {
    const { date, method, name, returnEmailAddress, body }: any = r.payload

    var jwtClient = new google.auth.JWT(config.client_email, null, config.private_key, ["https://mail.google.com/"], null);

    const jwt = await jwtClient.authorize();

    console.log('tokens ', jwt )

    let transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'philgoodmusic@gmail.com',
            pass: 'Sangmin733!'
        }
        // auth: {
        //     type: 'OAuth2',
        //     user: config.client_email,
        //     serviceClient: config.client_id,
        //     privateKey: config.private_key,
        //     accessToken: jwt.access_token,
        //     expires: jwt.expiry_date
        // }
    });

    console.log('transpoert', transporter)
    

    const info: any = await transporter.sendMail({
        from: returnEmailAddress, // sender address
        to: "mr.philipmlee@gmail.com, ctina.suh@gmail.com", // list of receivers
        subject: "Hello You Have a New Farmr Order! ✔", // Subject line
        html: `<div><h1>Hi Christina!<h1><br/><p>${name} says, ${body}!<p/><br/><p>${name} would like to schedule a ${method} on ${date}</p><br/><p>Please email back to ${returnEmailAddress}</div>`,
    })

    console.log('info', info)
    return { messageId: info.messageId, date, method, name, returnEmailAddress, body };
    
  
};