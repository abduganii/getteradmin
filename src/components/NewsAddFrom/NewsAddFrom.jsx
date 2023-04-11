import React, { useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import 'froala-editor/js/froala_editor.pkgd.min.js';
import Froalaeditor from 'froala-editor'

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

// Include special components if required.
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

import { Link, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';


export default function NewsAddFrom() {
    const params = useParams()
    const [tag, setTags] = useState('')
    const config = {
        enter: Froalaeditor.ENTER_BR,
        tableStyles: {
            "no-border": "No border"
        },
        charCounterCount: true,
        useClasses: false,
        attribution: false,
        heightMin: 220,
        heightMax: 592,
        widthMax: '100%',
        linkInsertButtons: [],
        fontFamilySelection: true,
        fontSizeSelection: true,
        paragraphFormatSelection: true,
        videoResponsive: true,
        toolbarSticky: true,
        toolbarInline: false,
        toolbarVisibleWithoutSelection: true,
        toolbarButtons: {
            'moreText': {
                'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
            },
            'moreParagraph': {
                'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
            },
            'moreRich': {
                'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
            },
            'moreMisc': {
                'buttons': ['undo', 'redo', 'fullscreen', 'print', 'spellChecker', 'selectAll', 'html', 'help'],
                'align': 'right',
                'buttonsVisible': 2
            }
        },
        events: {
            initialized: function () {
                replyEditor = this;
            },
            blur: () => {
                console.log(replyEditor.html.get(true));
            },
            'image.beforeUpload': (e, editor) => {
                console.log('image upload');
                // console.log(e);
                // console.log(editor);
                replyEditor.image.insert('https://images.unsplash.com/photo-1661961110144-12ac85918e40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', null, null, replyEditor.image.get());
                return false
            },
            'video.beforeUpload': (e, editor) => {
                console.log(replyEditor.video);
                replyEditor.video.insert('https://youtu.be/w4lbJZ8OPMk', null, null, replyEditor.video.get());
                replyEditor.video.get()
                return false
            },
            'paste.beforeCleanup': function (clipboardHtml) {
                // return _convertHtmlToPlainText(clipboardHtml);
            }
        }
    }


    let replyEditor = "";
    return (

        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.NEWS}>Добавление новости</Link></button>
                <button className='ServicesFrom_top-Edit btnopacity'>Изменить</button>
                <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                <button className='ServicesFrom_top-Cancel'>Отменить</button>
                <button className='ServicesFrom_top-Publish'>Сохранить</button>
            </div>
            <form className="ServicesFrom_from">
                <div className='ServicesFrom_from-mid mid2'>
                    <div className='mid2-div'>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />
                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />
                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />

                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />

                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Загаловок новости' onClick={(e) => e.target.classList.add("inputtagcolor")} />
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" value={tag} placeholder='#Узбекистан' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                if (e.target.value !== "#" && e.target.value.length == 1) {
                                    setTags("#" + e.target.value)
                                } else {
                                    setTags(e.target.value)
                                }
                                e.target.classList.add("inputtagcolor")
                            }} />
                            <ul className='ServicesFrom_from-mid-tagslist'>
                                <li value={"#Узбекистан"} className='ServicesFrom_from-mid-tagsitem'>#Узбекистан</li>
                            </ul>
                        </div>
                        <input className='ServicesFrom_from-mid-date' type="date" />

                    </div>
                </div>

                <FroalaEditor config={config} onModelChange={e => console.log(e)} onClick={(e) => e.target.classList.add("inputtagcolor")} />

                <p className='ServicesFrom_from-add'> Как добавить новости?</p>
            </form>
        </div>
    )
}
