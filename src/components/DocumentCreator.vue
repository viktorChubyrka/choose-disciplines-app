<template>
    <div>
        <b-button style="margin:20px 0px 0px;"
            @click="generateWordDocument()"
            type="is-primary"
            rounded
            expanded
            >Підтвердити вибір
        </b-button>
    </div>
</template>
<script>
import * as docx from "docx";

import { saveAs } from "file-saver"


export default {
    props:{
        stage:{
            type:String,
        },
        selected_disciplines:{
            type:Array
        }
    },
    data:()=>{
        return {
            
        }
    },
    methods:{
        generateWordDocument(){
            const doc = new docx.Document({
                sections: [{
                    properties: {},
                    children: [
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\tДекану",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\tматематичного",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\tфакультету",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\t_______________________________",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\t\t\t(прізвище, ініціали)",
                                    font:'Times New Roman',
                                    size:16,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: `\t\t\t\t\t\tстудента ${this.stage} курсу`,
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                         new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\tспеціальності Системний аналіз",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\t_______________________________",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\tосвітня програма 124 Системний",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\tаналіз",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\t_______________________________",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\t\t\t(прізвище, ініціали)",
                                    font:'Times New Roman',
                                    size:16,
                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            alignment:'center',
                            spacing: {
                                before: 1000,
                                after: 1000,
                            },
                            children: [
                                new docx.TextRun({
                                    text: "ЗАЯВА",
                                    font:'Times New Roman',
                                    size:28,
                                     allCaps: true,
                                }),
                            ],
                        }),
                        new docx.Paragraph({
                            spacing: {
                                after: 100,
                            },
                           alignment:docx.AlignmentType.JUSTIFIED,
                            children: [
                                new docx.TextRun({
                                    text: "\tПрошу включити в мій індивідуальний навчальний план на 20___/20___ навчальний рік такі вибіркові навчальні дисципліни (спеціалізований блок вибіркових дисциплін):",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        ...this.obj,
                       
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                     spacing: {
                                        after: 500,
                                        before:500
                                    },
                                    text: "\tДата 			________________ (Прізвище, ініціали)",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            spacing: {
                                after: 1000,
                            },
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t/підпис студента",
                                    font:'Times New Roman',
                                    size:16,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            spacing: {
                                after: 500,
                            },
                            children: [
                                new docx.TextRun({
                                    text: "Погоджено:",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\tКуратор  ______________________________ (Прізвище, ініціали):",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            spacing: {
                                after: 500,
                            },
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t/підпис куратора/",
                                    font:'Times New Roman',
                                    size:16,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\tКуратор  ______________________________ (Прізвище, ініціали):",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    spacing: {
                                        after: 500,
                                    },
                                    text: "\t\t\t\t\t підпис декана",
                                    font:'Times New Roman',
                                    size:16,

                                }),
                                
                            ],
                        }),
                         
                    ],
                }]
            });

            docx.Packer.toBlob(doc).then((blob) => {
                saveAs(blob,"My Document.docx");
            });

        },
       
    },
    computed:{
        obj(){
            let array = [];
            this.selected_disciplines.forEach((el,index) =>{
                array.push(
                    new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: `${index+1}.${el}`,
                                    font:'Times New Roman',
                                    size:28,
                                }),
                                
                            ],
                        }),
                );
            });
            array.push(
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            spacing: {
                            after: 2000,
                        },
                        text: ``,
                        font:'Times New Roman',
                        size:28,
                      }),                            
                    ],
                }),
            );
            return array;
        }
    }
}
</script>
