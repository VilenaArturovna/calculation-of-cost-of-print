import styled from 'styled-components';
import { useRef, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactToPrint from 'react-to-print';
import { PrinterType, ResponsePrinterType } from './types';

const validationSchema = Yup.object({
  MFDModel: Yup.string().required('Required'),
  resource: Yup.number().required('Required'),
  fillingOutSheet: Yup.number().required('Required'),
  resourceCartridge: Yup.number().required('Required'),
  priceCartridge: Yup.number().required('Required'),
  resourcePaperFeedUnit1: Yup.number().required('Required'),
  pricePaperFeedUnit1: Yup.number().required('Required'),
  resourcePaperFeedUnit2: Yup.number().required('Required'),
  pricePaperFeedUnit2: Yup.number().required('Required'),
  resourcePaperFeedUnit3: Yup.number().required('Required'),
  pricePaperFeedUnit3: Yup.number().required('Required'),
  resourceADFNode1: Yup.number().required('Required'),
  priceADFNode1: Yup.number().required('Required'),
  resourceADFNode2: Yup.number().required('Required'),
  priceADFNode2: Yup.number().required('Required'),
  resourceADFNode3: Yup.number().required('Required'),
  priceADFNode3: Yup.number().required('Required'),
  resourcePhotoreceptorUnit1: Yup.number().required('Required'),
  pricePhotoreceptorUnit1: Yup.number().required('Required'),
  resourcePhotoreceptorUnit2: Yup.number().required('Required'),
  pricePhotoreceptorUnit2: Yup.number().required('Required'),
  resourcePhotoreceptorUnit3: Yup.number().required('Required'),
  pricePhotoreceptorUnit3: Yup.number().required('Required'),
  resourcePhotoreceptorUnitFull: Yup.number().required('Required'),
  pricePhotoreceptorUnitFull: Yup.number().required('Required'),
  resourceDevelopmentBlock1: Yup.number().required('Required'),
  priceDevelopmentBlock1: Yup.number().required('Required'),
  resourceDevelopmentBlock2: Yup.number().required('Required'),
  priceDevelopmentBlock2: Yup.number().required('Required'),
  resourceDevelopmentBlock3: Yup.number().required('Required'),
  priceDevelopmentBlock3: Yup.number().required('Required'),
  resourceDevelopmentBlockFull: Yup.number().required('Required'),
  priceDevelopmentBlockFull: Yup.number().required('Required'),
  resourcePinningUnit1: Yup.number().required('Required'),
  pricePinningUnit1: Yup.number().required('Required'),
  resourcePinningUnit2: Yup.number().required('Required'),
  pricePinningUnit2: Yup.number().required('Required'),
  resourcePinningUnit3: Yup.number().required('Required'),
  pricePinningUnit3: Yup.number().required('Required'),
  resourcePinningUnit4: Yup.number().required('Required'),
  pricePinningUnit4: Yup.number().required('Required'),
  resourcePinningUnit5: Yup.number().required('Required'),
  pricePinningUnit5: Yup.number().required('Required'),
  resourcePinningUnitFull: Yup.number().required('Required'),
  pricePinningUnitFull: Yup.number().required('Required'),
});

const useStyles = makeStyles(() => createStyles({
  root: {
    '& .MuiTextField-root': {
      margin: '5px',
    }, '& .MuiPaper-root': {
      marginBottom: '10px',
    }, '& .MuiTable-root': {
      width: '600px',
      marginBottom: '10px'
    }
  },
}),);

type Props = {
  note?: ResponsePrinterType
}

export function Printer({note}: Props) {
  const classes = useStyles();

  const [isOpenMainInfo, setIsOpenMainInfo] = useState(true);
  const [isOpenCartridge, setIsOpenCartridge] = useState(false);
  const [isOpenPaperFeedUnit, setIsOpenPaperFeedUnit] = useState(false);
  const [isOpenADFNode, setIsOpenADFNode] = useState(false);
  const [isOpenPhotoreceptorUnit, setIsOpenPhotoreceptorUnit] = useState(false);
  const [isOpenDevelopmentBlock, setIsOpenDevelopmentBlock] = useState(false);
  const [isOpenPinningUnit, setIsOpenPinningUnit] = useState(false);

  const [hasResults, setHasResults] = useState(false);
  const [isOpenResultsWindow, setIsOpenResultsWindow] = useState(false);

  const initialValues: PrinterType = {
    MFDModel: note?.fields.MFDModel || '',
    resource: note?.fields.resource || 0,
    fillingOutSheet: note?.fields.fillingOutSheet || 5,

    partNumberCartridge: note?.fields.partNumberCartridge || '',
    resourceCartridge: note?.fields.resourceCartridge || 0,
    priceCartridge: note?.fields.priceCartridge || 0,
    partNumberCartridge2: note?.fields.partNumberCartridge2 || '',
    resourceCartridge2: note?.fields.resourceCartridge2 || 0,
    priceCartridge2: note?.fields.priceCartridge2 || 0,
    checkboxCartridge: note?.fields.checkboxCartridge || false,

    partNumberPaperFeedUnit1: note?.fields.partNumberPaperFeedUnit1 || '',
    resourcePaperFeedUnit1: note?.fields.resourcePaperFeedUnit1 || 0,
    pricePaperFeedUnit1: note?.fields.pricePaperFeedUnit1 || 0,
    partNumberPaperFeedUnit2: note?.fields.partNumberPaperFeedUnit2 || '',
    resourcePaperFeedUnit2: note?.fields.resourcePaperFeedUnit2 || 0,
    pricePaperFeedUnit2: note?.fields.pricePaperFeedUnit2 || 0,
    partNumberPaperFeedUnit3: note?.fields.partNumberPaperFeedUnit3 || '',
    resourcePaperFeedUnit3: note?.fields.resourcePaperFeedUnit3 || 0,
    pricePaperFeedUnit3: note?.fields.pricePaperFeedUnit3 || 0,

    partNumberADFNode1: note?.fields.partNumberADFNode1 || '',
    resourceADFNode1: note?.fields.resourceADFNode1 || 0,
    priceADFNode1: note?.fields.priceADFNode1 || 0,
    partNumberADFNode2: note?.fields.partNumberADFNode2 || '',
    resourceADFNode2: note?.fields.resourceADFNode2 || 0,
    priceADFNode2: note?.fields.priceADFNode2 || 0,
    partNumberADFNode3: note?.fields.partNumberADFNode3 || '',
    resourceADFNode3: note?.fields.resourceADFNode3 || 0,
    priceADFNode3: note?.fields.priceADFNode3 || 0,

    partNumberPhotoreceptorUnit1: note?.fields.partNumberPhotoreceptorUnit1 || '',
    resourcePhotoreceptorUnit1: note?.fields.resourcePhotoreceptorUnit1 || 0,
    pricePhotoreceptorUnit1: note?.fields.pricePhotoreceptorUnit1 || 0,
    partNumberPhotoreceptorUnit2: note?.fields.partNumberPhotoreceptorUnit2 || '',
    resourcePhotoreceptorUnit2: note?.fields.resourcePhotoreceptorUnit2 || 0,
    pricePhotoreceptorUnit2: note?.fields.pricePhotoreceptorUnit2 || 0,
    partNumberPhotoreceptorUnit3: note?.fields.partNumberPhotoreceptorUnit3 || '',
    resourcePhotoreceptorUnit3: note?.fields.resourcePhotoreceptorUnit3 || 0,
    pricePhotoreceptorUnit3: note?.fields.pricePhotoreceptorUnit3 || 0,
    partNumberPhotoreceptorUnit4: note?.fields.partNumberPhotoreceptorUnit4 || '',
    resourcePhotoreceptorUnit4: note?.fields.resourcePhotoreceptorUnit4 || 0,
    pricePhotoreceptorUnit4: note?.fields.pricePhotoreceptorUnit4 || 0,
    partNumberPhotoreceptorUnitFull: note?.fields.partNumberPhotoreceptorUnitFull || '',
    resourcePhotoreceptorUnitFull: note?.fields.resourcePhotoreceptorUnitFull || 0,
    pricePhotoreceptorUnitFull: note?.fields.pricePhotoreceptorUnitFull || 0,
    checkboxPhotoreceptorUnit: note?.fields.checkboxPhotoreceptorUnit || false,

    partNumberDevelopmentBlock1: note?.fields.partNumberDevelopmentBlock1 || '',
    resourceDevelopmentBlock1: note?.fields.resourceDevelopmentBlock1 || 0,
    priceDevelopmentBlock1: note?.fields.priceDevelopmentBlock1 || 0,
    partNumberDevelopmentBlock2: note?.fields.partNumberDevelopmentBlock2 || '',
    resourceDevelopmentBlock2: note?.fields.resourceDevelopmentBlock2 || 0,
    priceDevelopmentBlock2: note?.fields.priceDevelopmentBlock2 || 0,
    partNumberDevelopmentBlock3: note?.fields.partNumberDevelopmentBlock3 || '',
    resourceDevelopmentBlock3: note?.fields.resourceDevelopmentBlock3 || 0,
    priceDevelopmentBlock3: note?.fields.priceDevelopmentBlock3 || 0,
    partNumberDevelopmentBlock4: note?.fields.partNumberDevelopmentBlock4 || '',
    resourceDevelopmentBlock4: note?.fields.resourceDevelopmentBlock4 || 0,
    priceDevelopmentBlock4: note?.fields.priceDevelopmentBlock4 || 0,
    partNumberDevelopmentBlockFull: note?.fields.partNumberDevelopmentBlockFull || '',
    resourceDevelopmentBlockFull: note?.fields.resourceDevelopmentBlockFull || 0,
    priceDevelopmentBlockFull: note?.fields.priceDevelopmentBlockFull || 0,
    checkboxDevelopmentBlock: note?.fields.checkboxDevelopmentBlock || false,

    partNumberPinningUnit1: note?.fields.partNumberPinningUnit1 || '',
    resourcePinningUnit1: note?.fields.resourcePinningUnit1 || 0,
    pricePinningUnit1: note?.fields.pricePinningUnit1 || 0,
    partNumberPinningUnit2: note?.fields.partNumberPinningUnit2 || '',
    resourcePinningUnit2: note?.fields.resourcePinningUnit2 || 0,
    pricePinningUnit2: note?.fields.pricePinningUnit2 || 0,
    partNumberPinningUnit3: note?.fields.partNumberPinningUnit3 || '',
    resourcePinningUnit3: note?.fields.resourcePinningUnit3 || 0,
    pricePinningUnit3: note?.fields.pricePinningUnit3 || 0,
    partNumberPinningUnit4: note?.fields.partNumberPinningUnit4 || '',
    resourcePinningUnit4: note?.fields.resourcePinningUnit4 || 0,
    pricePinningUnit4: note?.fields.pricePinningUnit4 || 0,
    partNumberPinningUnit5: note?.fields.partNumberPinningUnit5 || '',
    resourcePinningUnit5: note?.fields.resourcePinningUnit5 || 0,
    pricePinningUnit5: note?.fields.pricePinningUnit5 || 0,
    partNumberPinningUnit6: note?.fields.partNumberPinningUnit6 || '',
    resourcePinningUnit6: note?.fields.resourcePinningUnit6 || 0,
    pricePinningUnit6: note?.fields.pricePinningUnit6 || 0,
    partNumberPinningUnitFull: note?.fields.partNumberPinningUnitFull || '',
    resourcePinningUnitFull: note?.fields.resourcePinningUnitFull || 0,
    pricePinningUnitFull: note?.fields.pricePinningUnitFull || 0,
    checkboxPinningUnit: note?.fields.checkboxPinningUnit || false,
  }

  const formik = useFormik({
    initialValues, validationSchema: validationSchema, onSubmit: () => {
      setHasResults(true);
      setIsOpenResultsWindow(true);
    }
  });

  // @ts-ignore
  const resultCartridge = (formik.values.priceCartridge / formik.values.resourceCartridge) * (5 / formik.values.fillingOutSheet) + (formik.values.checkboxCartridge ? (formik.values.priceCartridge2 / formik.values.priceCartridge2) : 0);
  // @ts-ignore
  const resultPaperFeedUnit = (formik.values.pricePaperFeedUnit1 / formik.values.resourcePaperFeedUnit1) + (formik.values.pricePaperFeedUnit2 / formik.values.resourcePaperFeedUnit2) + (formik.values.pricePaperFeedUnit3 / formik.values.resourcePaperFeedUnit3);
  // @ts-ignore
  const resultADFNode = (formik.values.priceADFNode1 / formik.values.resourceADFNode1) + (formik.values.priceADFNode2 / formik.values.resourceADFNode2) + (formik.values.priceADFNode3 / formik.values.resourceADFNode3);
  // @ts-ignore
  const resultPhotoreceptorUnit = (formik.values.pricePhotoreceptorUnit1 / formik.values.resourcePhotoreceptorUnit1) + (formik.values.pricePhotoreceptorUnit2 / formik.values.resourcePhotoreceptorUnit2) + (formik.values.pricePhotoreceptorUnit3 / formik.values.resourcePhotoreceptorUnit3) + (formik.values.checkboxPhotoreceptorUnit ? (formik.values.pricePhotoreceptorUnit4 / formik.values.resourcePhotoreceptorUnit4) : 0);
  // @ts-ignore
  const resultPhotoreceptorUnitFull = (formik.values.pricePhotoreceptorUnitFull / formik.values.resourcePhotoreceptorUnitFull);
  // @ts-ignore
  const resultDevelopmentBlock = (formik.values.priceDevelopmentBlock1 / formik.values.resourceDevelopmentBlock1) + (formik.values.priceDevelopmentBlock2 / formik.values.resourceDevelopmentBlock2) + (formik.values.priceDevelopmentBlock3 / formik.values.resourceDevelopmentBlock3) + (formik.values.checkboxDevelopmentBlock ? (formik.values.priceDevelopmentBlock4 / formik.values.resourceDevelopmentBlock4) : 0);
  // @ts-ignore
  const resultDevelopmentBlockFull = (formik.values.priceDevelopmentBlockFull / formik.values.resourceDevelopmentBlockFull);
  // @ts-ignore
  const resultPinningUnit = (formik.values.pricePinningUnit1 / formik.values.resourcePinningUnit1) + (formik.values.pricePinningUnit2 / formik.values.resourcePinningUnit2) + (formik.values.pricePinningUnit3 / formik.values.resourcePinningUnit3) + (formik.values.pricePinningUnit4 / formik.values.resourcePinningUnit4) + (formik.values.pricePinningUnit5 / formik.values.resourcePinningUnit5) + (formik.values.checkboxPinningUnit ? (formik.values.pricePinningUnit6 / formik.values.resourcePinningUnit6) : 0);
  // @ts-ignore
  const resultPinningUnitFull = (formik.values.pricePinningUnitFull / formik.values.resourcePinningUnitFull);
  // @ts-ignore
  const result = resultCartridge + resultPaperFeedUnit + resultADFNode + resultPhotoreceptorUnit + resultDevelopmentBlock + resultPinningUnit;
  // @ts-ignore
  const resultFull = resultCartridge + resultPaperFeedUnit + resultADFNode + resultPhotoreceptorUnitFull + resultDevelopmentBlockFull + resultPinningUnitFull;

  const tableHeadsItems = ['Часть', 'Part number', 'Ресурс', 'Количество', 'Цена'];
  const tablePaperFeedUnit = [
    [
      'Подхват',
      formik.values.partNumberPaperFeedUnit1,
      formik.values.resourcePaperFeedUnit1,
      (formik.values.resource || 1) / (formik.values.resourcePaperFeedUnit1 || 1),
      formik.values.pricePaperFeedUnit1
    ],
    [
      'Отделение',
      formik.values.partNumberPaperFeedUnit2,
      formik.values.resourcePaperFeedUnit2,
      (formik.values.resource || 1) / (formik.values.resourcePaperFeedUnit2 || 1),
      formik.values.pricePaperFeedUnit2
    ],
    [
      'Протяжка',
      formik.values.partNumberPaperFeedUnit3,
      formik.values.resourcePaperFeedUnit3,
      (formik.values.resource || 1) / (formik.values.resourcePaperFeedUnit3 || 1),
      formik.values.pricePaperFeedUnit3
    ],
  ];
  const tableADFNode = [
    [
      'Подхват',
      formik.values.partNumberADFNode1,
      formik.values.resourceADFNode1,
      (formik.values.resource || 1) / (formik.values.resourceADFNode1 || 1),
      formik.values.priceADFNode1
    ],
    [
      'Отделение',
      formik.values.partNumberADFNode2,
      formik.values.resourceADFNode2,
      (formik.values.resource || 1) / (formik.values.resourceADFNode2 || 1),
      formik.values.priceADFNode2
    ],
    [
      'Протяжка',
      formik.values.partNumberADFNode3,
      formik.values.resourceADFNode3,
      (formik.values.resource || 1) / (formik.values.resourceADFNode3 || 1),
      formik.values.priceADFNode3
    ],
  ];
  const tablePhotoreceptorUnit = [
    [
      'Фоторецептор',
      formik.values.partNumberPhotoreceptorUnit1,
      formik.values.resourcePhotoreceptorUnit1,
      (formik.values.resource || 1) / (formik.values.resourcePhotoreceptorUnit1 || 1),
      formik.values.pricePhotoreceptorUnit1
    ],
    [
      'Ракель',
      formik.values.partNumberPhotoreceptorUnit2,
      formik.values.resourcePhotoreceptorUnit2,
      (formik.values.resource || 1) / (formik.values.resourcePhotoreceptorUnit2 || 1),
      formik.values.pricePhotoreceptorUnit2
    ],
    [
      'Ролик заряда/коротрон',
      formik.values.partNumberPhotoreceptorUnit3,
      formik.values.resourcePhotoreceptorUnit3,
      (formik.values.resource || 1) / (formik.values.resourcePhotoreceptorUnit3 || 1),
      formik.values.pricePhotoreceptorUnit3
    ],
    [
      'Чип',
      formik.values.partNumberPhotoreceptorUnit4,
      formik.values.resourcePhotoreceptorUnit4,
      (formik.values.resource || 0) / (formik.values.resourcePhotoreceptorUnit4 || 1),
      formik.values.pricePhotoreceptorUnit4
    ],
  ];
  const photoreceptorUnit = [
    'Узел в сборе',
    formik.values.partNumberPhotoreceptorUnitFull,
    formik.values.resourcePhotoreceptorUnitFull,
    (formik.values.resource || 0) / (formik.values.resourcePhotoreceptorUnitFull || 1),
    formik.values.pricePhotoreceptorUnitFull
  ]
  const tableDevelopmentBlock = [
    [
      'Вал проявки',
      formik.values.partNumberDevelopmentBlock1,
      formik.values.resourceDevelopmentBlock1,
      (formik.values.resource || 1) / (formik.values.resourceDevelopmentBlock1 || 1),
      formik.values.priceDevelopmentBlock1
    ],
    [
      'Доктор',
      formik.values.partNumberDevelopmentBlock2,
      formik.values.resourceDevelopmentBlock2,
      (formik.values.resource || 1) / (formik.values.resourceDevelopmentBlock2 || 1),
      formik.values.priceDevelopmentBlock2
    ],
    [
      'Девелопер',
      formik.values.partNumberDevelopmentBlock3,
      formik.values.resourceDevelopmentBlock3,
      (formik.values.resource || 1) / (formik.values.resourceDevelopmentBlock3 || 1),
      formik.values.priceDevelopmentBlock3
    ],
    [
      'Чип',
      formik.values.partNumberDevelopmentBlock4,
      formik.values.resourceDevelopmentBlock4,
      (formik.values.resource || 0) / (formik.values.resourceDevelopmentBlock4 || 1),
      formik.values.priceDevelopmentBlock4
    ],
  ];
  const developmentBlock = [
    'Узел в сборе',
    formik.values.partNumberDevelopmentBlockFull,
    formik.values.resourceDevelopmentBlockFull,
    (formik.values.resource || 0) / (formik.values.resourceDevelopmentBlockFull || 1),
    formik.values.priceDevelopmentBlockFull
  ]
  const tablePinningUnit = [
    [
      'Вал тефлоновый/термопленка',
      formik.values.partNumberPinningUnit1,
      formik.values.resourcePinningUnit1,
      (formik.values.resource || 1) / (formik.values.resourcePinningUnit1 || 1),
      formik.values.pricePinningUnit1
    ],
    [
      'Вал прижимной',
      formik.values.partNumberPinningUnit2,
      formik.values.resourcePinningUnit2,
      (formik.values.resource || 1) / (formik.values.resourcePinningUnit2 || 1),
      formik.values.pricePinningUnit2
    ],
    [
      'Подшипник левый',
      formik.values.partNumberPinningUnit3,
      formik.values.resourcePinningUnit3,
      (formik.values.resource || 1) / (formik.values.resourcePinningUnit3 || 1),
      formik.values.pricePinningUnit3
    ],
    [
      'Подшипник правый',
      formik.values.partNumberPinningUnit4,
      formik.values.resourcePinningUnit4,
      (formik.values.resource || 1) / (formik.values.resourcePinningUnit4 || 1),
      formik.values.pricePinningUnit4
    ],
    [
      'Палец отделения',
      formik.values.partNumberPinningUnit5,
      formik.values.resourcePinningUnit5,
      (formik.values.resource || 1) / (formik.values.resourcePinningUnit5 || 1),
      formik.values.pricePinningUnit5
    ],
    [
      'Чип',
      formik.values.partNumberPinningUnit6,
      formik.values.resourcePinningUnit6,
      (formik.values.resource || 0) / (formik.values.resourcePinningUnit6 || 1),
      formik.values.pricePinningUnit6
    ],
  ];
  const pinningUnit = [
    'Узел в сборе',
    formik.values.partNumberPinningUnitFull,
    formik.values.resourcePinningUnitFull,
    (formik.values.resource || 0) / (formik.values.resourcePinningUnitFull || 1),
    formik.values.pricePinningUnitFull
  ]
  const cartridge = [
    [
    'Заправка',
    formik.values.partNumberCartridge,
    formik.values.resourceCartridge,
    (formik.values.resource || 0) / ((formik.values.resourceCartridge || 1) * (5 / formik.values.fillingOutSheet)),
    formik.values.priceCartridge
  ],
    [
      'Чип',
      formik.values.partNumberCartridge2,
      formik.values.resourceCartridge2,
      (formik.values.resource || 0) / (formik.values.resourceCartridge2 || 1),
      formik.values.priceCartridge2
    ],
  ]

  const table1 = useRef(null)
  const table2 = useRef(null)

  const createNote = async () => {
    try {
      await fetch('/.netlify/functions/notes', {
        method: 'POST',
        body: JSON.stringify({...formik.values }),
      });
    } catch (err) {
      console.error(err);
    }
  };
  const updateNote = async () => {
    const obj = {
      id: note?.id, fields: {...formik.values}
    }
    const a = JSON.stringify([obj])
    console.log(a);
    try {
      await fetch('/.netlify/functions/notes', {
        method: 'PUT',
        // @ts-ignore
        body: a,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const saveNote = async () => {
    if (!note?.id) {
      await createNote()
    } else {
      await updateNote()
    }
  }

  return (<Root className={classes.root}>
    {!isOpenResultsWindow && <Container>
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <CustomCardContent>
                    <Title onClick={() => setIsOpenMainInfo(!isOpenMainInfo)}>
                        Основные данные
                    </Title>
                  {isOpenMainInfo && <>
                      <TextField variant="filled" label="Модель" size="small"
                                 {...formik.getFieldProps('MFDModel')}/>
                      <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps('resource')}/>
                      <TextField type='number' variant="filled" label="Заполнение листа" size="small" {...formik.getFieldProps('fillingOutSheet')}/>
                  </>}
                </CustomCardContent>
              {isOpenMainInfo && <CardActions>
                  <Button onClick={() => {
                    setIsOpenMainInfo(false);
                    setIsOpenCartridge(true);
                  }}>
                      Далее
                  </Button>
              </CardActions>}
            </Card>
            <Card>
                <CustomCardContent>
                    <Title onClick={() => setIsOpenCartridge(!isOpenCartridge)}>
                        Картридж
                    </Title>
                  {isOpenCartridge && <>
                      <SubTitle>
                          Заправка
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberCartridge')}/>
                          <TextField type='number' variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceCartridge')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceCartridge')}/>
                      </Fields>
                      <Fields>
                          <Checkbox {...formik.getFieldProps('checkboxCartridge')}/>
                          <SubTitle>
                              Чип
                          </SubTitle>
                      </Fields>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberCartridge2')} disabled={!formik.values.checkboxCartridge}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceCartridge2')} disabled={!formik.values.checkboxCartridge}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('priceCartridge2')}
                                     disabled={!formik.values.checkboxCartridge}/>
                      </Fields>
                  </>}
                </CustomCardContent>
              {isOpenCartridge && <CardActions>
                  <Button onClick={() => {
                    setIsOpenCartridge(false);
                    setIsOpenPaperFeedUnit(true);
                  }}>
                      Далее
                  </Button>
              </CardActions>}
            </Card>
            <Card>
                <CustomCardContent>
                    <Title onClick={() => setIsOpenPaperFeedUnit(!isOpenPaperFeedUnit)}>
                        Узел подачи бумаги
                    </Title>
                  {isOpenPaperFeedUnit && <>
                      <SubTitle>
                          Подхват
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPaperFeedUnit1')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePaperFeedUnit1')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePaperFeedUnit1')}/>
                      </Fields>
                      <SubTitle>
                          Отделение
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPaperFeedUnit2')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePaperFeedUnit2')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePaperFeedUnit2')}/>
                      </Fields>
                      <SubTitle>
                          Протяжка
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPaperFeedUnit3')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePaperFeedUnit3')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePaperFeedUnit3')}/>
                      </Fields>
                  </>}
                </CustomCardContent>
              {isOpenPaperFeedUnit && <CardActions>
                  <Button onClick={() => {
                    setIsOpenPaperFeedUnit(false);
                    setIsOpenADFNode(true);
                  }}>
                      Далее
                  </Button>
              </CardActions>}
            </Card>
            <Card>
                <CustomCardContent>
                    <Title onClick={() => setIsOpenADFNode(!isOpenADFNode)}>
                        Узел ADF
                    </Title>
                  {isOpenADFNode && <>
                      <SubTitle>
                          Подхват
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberADFNode1')}/>
                          <TextField type='number' variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceADFNode1')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('priceADFNode1')}/>
                      </Fields>
                      <SubTitle>
                          Отделение
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberADFNode2')}/>
                          <TextField type='number' variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceADFNode2')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('priceADFNode2')}/>
                      </Fields>
                      <SubTitle>
                          Протяжка
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberADFNode3')}/>
                          <TextField type='number' variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceADFNode3')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('priceADFNode3')}/>
                      </Fields>
                  </>}
                </CustomCardContent>
              {isOpenADFNode && <CardActions>
                  <Button onClick={() => {
                    setIsOpenADFNode(false);
                    setIsOpenPhotoreceptorUnit(true);
                  }}>
                      Далее
                  </Button>
              </CardActions>}
            </Card>
            <Card>
                <CustomCardContent>
                    <Title onClick={() => setIsOpenPhotoreceptorUnit(!isOpenPhotoreceptorUnit)}>
                        Блок Фоторецептора
                    </Title>
                  {isOpenPhotoreceptorUnit && <>
                      <SubTitle>
                          Фоторецептор
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnit1')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit1')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnit1')}/>
                      </Fields>
                      <SubTitle>
                          Ракель
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnit2')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit2')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnit2')}/>
                      </Fields>
                      <SubTitle>
                          Ролик заряда/коротрон
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnit3')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit3')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnit3')}/>
                      </Fields>
                      <Fields>
                          <Checkbox {...formik.getFieldProps('checkboxPhotoreceptorUnit')}/>
                          <SubTitle>
                              Чип
                          </SubTitle>
                      </Fields>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnit4')} disabled={!formik.values.checkboxPhotoreceptorUnit}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit4')} disabled={!formik.values.checkboxPhotoreceptorUnit}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnit4')} disabled={!formik.values.checkboxPhotoreceptorUnit}/>
                      </Fields>
                      <SubTitle>
                          Узел в сборе
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnitFull')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnitFull')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnitFull')}/>
                      </Fields>
                  </>}
                </CustomCardContent>
              {isOpenPhotoreceptorUnit && <CardActions>
                  <Button onClick={() => {
                    setIsOpenPhotoreceptorUnit(false);
                    setIsOpenDevelopmentBlock(true);
                  }}>
                      Далее
                  </Button>
              </CardActions>}
            </Card>
            <Card>
                <CustomCardContent>
                    <Title onClick={() => setIsOpenDevelopmentBlock(!isOpenDevelopmentBlock)}>
                        Блок проявки
                    </Title>
                  {isOpenDevelopmentBlock && <>
                      <SubTitle>
                          Вал проявки
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlock1')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock1')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlock1')}/>
                      </Fields>
                      <SubTitle>
                          Доктор
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlock2')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock2')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlock2')}/>
                      </Fields>
                      <SubTitle>
                          Девелопер
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlock3')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock3')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlock3')}/>
                      </Fields>
                      <Fields>
                          <Checkbox {...formik.getFieldProps('checkboxDevelopmentBlock')}/>
                          <SubTitle>
                              Чип
                          </SubTitle>
                      </Fields>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlock4')} disabled={!formik.values.checkboxDevelopmentBlock}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock4')} disabled={!formik.values.checkboxDevelopmentBlock}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlock4')} disabled={!formik.values.checkboxDevelopmentBlock}/>
                      </Fields>
                      <SubTitle>
                          Узел в сборе
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlockFull')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlockFull')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlockFull')}/>
                      </Fields>
                  </>}
                </CustomCardContent>
              {isOpenDevelopmentBlock && <CardActions>
                  <Button onClick={() => {
                    setIsOpenDevelopmentBlock(false);
                    setIsOpenPinningUnit(true);
                  }}>
                      Далее
                  </Button>
              </CardActions>}
            </Card>
            <Card>
                <CustomCardContent>
                    <Title onClick={() => setIsOpenPinningUnit(!isOpenPinningUnit)}>
                        Блок закрепления
                    </Title>
                  {isOpenPinningUnit && <>
                      <SubTitle>
                          Вал тефлоновый/термопленка
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit1')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit1')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit1')}/>
                      </Fields>
                      <SubTitle>
                          Вал прижимной
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit2')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit2')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit2')}/>
                      </Fields>
                      <SubTitle>
                          Подшипник левый
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit3')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit3')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit3')}/>
                      </Fields>
                      <SubTitle>
                          Подшипник правый
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit4')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit4')}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit4')}/>
                      </Fields>
                      <SubTitle>
                          Палец отделения
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit5')}
                          />
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit5')} />
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit5')}
                          />
                      </Fields>
                      <Fields>
                          <Checkbox {...formik.getFieldProps('checkboxPinningUnit')}/>
                          <SubTitle>
                              Чип
                          </SubTitle>
                      </Fields>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit6')} disabled={!formik.values.checkboxPinningUnit}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit6')} disabled={!formik.values.checkboxPinningUnit}/>
                          <TextField type='number' variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit6')}
                                     disabled={!formik.values.checkboxPinningUnit}/>
                      </Fields>
                      <SubTitle>
                          Узел в сборе
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnitFull')}/>
                          <TextField type='number' variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnitFull')}/>
                          <TextField type='number' variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePinningUnitFull')}/>
                      </Fields>
                  </>}
                </CustomCardContent>
              {isOpenPinningUnit && <CardActions>
                  <Button type="submit">
                      Сделать расчет
                  </Button>
                  <Button onClick={saveNote}>
                      Сохранить расчет
                  </Button>
              </CardActions>}
            </Card>
        </form>
      {hasResults && <Button onClick={() => setIsOpenResultsWindow(true)}>Вернуться к результатам</Button>}
    </Container>}
    {isOpenResultsWindow && <>
        <Container>
            <Wrapper ref={table1}>
                <Title>{formik.values.MFDModel}</Title>
                <Title>Ресурс: {formik.values.resource}</Title>
                <Title>Заполнение листа: {formik.values.fillingOutSheet}%</Title>
                <Title>Стоимость отпечатка: {result} ₽</Title>
                <Table>
                    <TableHead>
                        <TableRow>
                          {tableHeadsItems.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow><TableTitle>Картридж</TableTitle></TableRow>
                        <TableRow>
                          {cartridge.map((item, index) => {
                            return <TableRow key={index}>
                              {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                            </TableRow>;
                          })}
                        </TableRow>
                        <TableRow><TableTitle>Узел подачи бумаги</TableTitle></TableRow>
                      {tablePaperFeedUnit.map((item, index) => {
                        return <TableRow key={index}>
                          {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>;
                      })}
                        <TableRow><TableTitle>Узел ADF</TableTitle></TableRow>
                      {tableADFNode.map((item, index) => {
                        return <TableRow key={index}>
                          {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>;
                      })}
                        <TableRow><TableTitle>Блок Фоторецептора</TableTitle></TableRow>
                      {tablePhotoreceptorUnit.map((item, index) => {
                        return <TableRow key={index}>
                          {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>;
                      })}
                        <TableRow><TableTitle>Блок проявки</TableTitle></TableRow>
                      {tableDevelopmentBlock.map((item, index) => {
                        return <TableRow key={index}>
                          {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>;
                      })}
                        <TableRow><TableTitle>Блок закрепления</TableTitle></TableRow>
                      {tablePinningUnit.map((item, index) => {
                        return <TableRow key={index}>
                          {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>;
                      })}
                    </TableBody>
                </Table>
            </Wrapper>
            <Fields>
                <ReactToPrint trigger={() => <Button variant='outlined' size='small'>Печать</Button>} content={() => table1.current} />
            </Fields>
        </Container>
        <Container>
            <Wrapper ref={table2}>
                <Title>{formik.values.MFDModel}</Title>
                <Title>Ресурс: {formik.values.resource}</Title>
                <Title>Заполнение листа: {formik.values.fillingOutSheet}%</Title>
                <Title>Стоимость отпечатка: {resultFull} ₽</Title>
                <Table>
                    <TableHead>
                        <TableRow>
                          {tableHeadsItems.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableTitle>Картридж</TableTitle>
                        <TableRow>
                          {cartridge.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>
                        <TableTitle>Узел подачи бумаги</TableTitle>
                      {tablePaperFeedUnit.map((item, index) => {
                        return <TableRow key={index}>
                          {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>;
                      })}
                        <TableTitle>Узел ADF</TableTitle>
                      {tableADFNode.map((item, index) => {
                        return <TableRow key={index}>
                          {item.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>;
                      })}
                        <TableTitle>Блок Фоторецептора</TableTitle>
                        <TableRow>
                          {photoreceptorUnit.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>
                        <TableTitle>Блок проявки</TableTitle>
                        <TableRow>
                          {developmentBlock.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>
                        <TableTitle>Блок закрепления</TableTitle>
                        <TableRow>
                          {pinningUnit.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                        </TableRow>
                    </TableBody>
                </Table>
            </Wrapper>
            <Fields>
                <Button variant='outlined' size='small' onClick={() => setIsOpenResultsWindow(false)}>Вернуться к расчетам</Button>
                <Button variant='outlined' size='small' onClick={saveNote}>Сохранить расчет</Button>
                <Button variant='outlined' size='small' onClick={() => formik.resetForm()}>Сбросить форму</Button>
                <ReactToPrint trigger={() => <Button variant='outlined' size='small'>Печать</Button>} content={() => table2.current} />
            </Fields>
        </Container>
    </>}
  </Root>);
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  margin: 20px;
  flex-direction: column;
`;
const Wrapper = styled.div`
padding: 10px;
`
const CustomCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  width: 650px;
`;
const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Fields = styled.div`
  display: flex;
`;
const SubTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 5px 10px;
`;
const TableTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 10px 10px 0;
`;
