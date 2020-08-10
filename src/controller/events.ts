import { Request, ResponseToolkit } from "@hapi/hapi";
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import CONFIGS from '../util/configs'

export interface IEvents {
    date: Date;
    name: string;
    returnEmailAddress: string;
    body: string;
    method: string;
    messageId: string
}


export const postEvents = async (r: Request, h: ResponseToolkit): Promise<any> => {
    const { date, method, name, returnEmailAddress, body }: any = r.payload

    let transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: CONFIGS.EMAIL,
            pass: CONFIGS.PASS
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