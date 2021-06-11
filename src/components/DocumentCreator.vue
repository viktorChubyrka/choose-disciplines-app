<template>
    <div>
        <b-button 
            @click="generateWordDocument()"
            type="is-primary"
            rounded
            expanded
            >Скачати документ
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
        },
        name:{
            type:String,
        },
        dekan:{
            type:String,
        },
        faculty_name:{
            type:String,
        },
        full_OP_name:{
            type:String,
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
                                    text: "\t\t\t\t\t\tфакультету",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: `\t\t\t\t\t\t${this.dekan}`,
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        // new docx.Paragraph({
                        //     children: [
                        //         new docx.TextRun({
                        //             text: "\t\t\t\t\t\t\t\t(прізвище, ініціали)",
                        //             font:'Times New Roman',
                        //             size:16,

                        //         }),
                                
                        //     ],
                        // }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: `\t\t\t\t\t\tвід студента ${this.stage} курсу`,
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                         new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: "\t\t\t\t\t\tспеціальності ________________",
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
                                    text: "\t\t\t\t\t\tосвітня програма ",
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: `\t\t\t\t\t\t ${this.full_OP_name}`,
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        new docx.Paragraph({
                           
                            children: [
                                new docx.TextRun({
                                    text: `\t\t\t\t\t\t${this.name}`,
                                    font:'Times New Roman',
                                    size:28,

                                }),
                                
                            ],
                        }),
                        // new docx.Paragraph({
                        //     children: [
                        //         new docx.TextRun({
                        //             text: "\t\t\t\t\t\t\t\t(прізвище, ініціали)",
                        //             font:'Times New Roman',
                        //             size:16,
                        //         }),
                                
                        //     ],
                        // }),
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
                                    text: "\tДата 			________________ ",
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
                                    text: "\tКуратор  ______________________________:",
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
                                    text: `\tДекан факультету  ______________________________:${this.dekan}`,
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
