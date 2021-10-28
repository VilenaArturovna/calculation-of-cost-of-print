import styled from 'styled-components';
import { useRef, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactToPrint from 'react-to-print';

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

export function Printer() {
  const classes = useStyles();

  const [isOpenMainInfo, setIsOpenMainInfo] = useState(false);
  const [isOpenCartridge, setIsOpenCartridge] = useState(false);
  const [isOpenPaperFeedUnit, setIsOpenPaperFeedUnit] = useState(false);
  const [isOpenADFNode, setIsOpenADFNode] = useState(false);
  const [isOpenPhotoreceptorUnit, setIsOpenPhotoreceptorUnit] = useState(false);
  const [isOpenDevelopmentBlock, setIsOpenDevelopmentBlock] = useState(false);
  const [isOpenPinningUnit, setIsOpenPinningUnit] = useState(false);

  const [hasResults, setHasResults] = useState(false);
  const [isOpenResultsWindow, setIsOpenResultsWindow] = useState(true);

  const formik = useFormik({
    initialValues: {
      MFDModel: '',
      resource: undefined,
      fillingOutSheet: 5,

      partNumberCartridge: '',
      resourceCartridge: undefined,
      priceCartridge: undefined,

      partNumberPaperFeedUnit1: '',
      resourcePaperFeedUnit1: undefined,
      pricePaperFeedUnit1: undefined,
      partNumberPaperFeedUnit2: '',
      resourcePaperFeedUnit2: undefined,
      pricePaperFeedUnit2: undefined,
      partNumberPaperFeedUnit3: '',
      resourcePaperFeedUnit3: undefined,
      pricePaperFeedUnit3: undefined,

      partNumberADFNode1: '',
      resourceADFNode1: undefined,
      priceADFNode1: undefined,
      partNumberADFNode2: '',
      resourceADFNode2: undefined,
      priceADFNode2: undefined,
      partNumberADFNode3: '',
      resourceADFNode3: undefined,
      priceADFNode3: undefined,

      partNumberPhotoreceptorUnit1: '',
      resourcePhotoreceptorUnit1: undefined,
      pricePhotoreceptorUnit1: undefined,
      partNumberPhotoreceptorUnit2: '',
      resourcePhotoreceptorUnit2: undefined,
      pricePhotoreceptorUnit2: undefined,
      partNumberPhotoreceptorUnit3: '',
      resourcePhotoreceptorUnit3: undefined,
      pricePhotoreceptorUnit3: undefined,
      partNumberPhotoreceptorUnit4: '',
      resourcePhotoreceptorUnit4: undefined,
      pricePhotoreceptorUnit4: undefined,
      partNumberPhotoreceptorUnitFull: '',
      resourcePhotoreceptorUnitFull: undefined,
      pricePhotoreceptorUnitFull: undefined,
      checkboxPhotoreceptorUnit: false,

      partNumberDevelopmentBlock1: '',
      resourceDevelopmentBlock1: undefined,
      priceDevelopmentBlock1: undefined,
      partNumberDevelopmentBlock2: '',
      resourceDevelopmentBlock2: undefined,
      priceDevelopmentBlock2: undefined,
      partNumberDevelopmentBlock3: '',
      resourceDevelopmentBlock3: undefined,
      priceDevelopmentBlock3: undefined,
      partNumberDevelopmentBlock4: '',
      resourceDevelopmentBlock4: undefined,
      priceDevelopmentBlock4: undefined,
      partNumberDevelopmentBlockFull: '',
      resourceDevelopmentBlockFull: undefined,
      priceDevelopmentBlockFull: undefined,
      checkboxDevelopmentBlock: false,

      partNumberPinningUnit1: '',
      resourcePinningUnit1: undefined,
      pricePinningUnit1: undefined,
      partNumberPinningUnit2: '',
      resourcePinningUnit2: undefined,
      pricePinningUnit2: undefined,
      partNumberPinningUnit3: '',
      resourcePinningUnit3: undefined,
      pricePinningUnit3: undefined,
      partNumberPinningUnit4: '',
      resourcePinningUnit4: undefined,
      pricePinningUnit4: undefined,
      partNumberPinningUnit5: '',
      resourcePinningUnit5: undefined,
      pricePinningUnit5: undefined,
      partNumberPinningUnit6: '',
      resourcePinningUnit6: undefined,
      pricePinningUnit6: undefined,
      partNumberPinningUnitFull: '',
      resourcePinningUnitFull: undefined,
      pricePinningUnitFull: undefined,
      checkboxPinningUnit: false,
    }, validationSchema: validationSchema, onSubmit: () => {
      setHasResults(true);
      setIsOpenResultsWindow(true);
    }
  });

  // @ts-ignore
  const resultCartridge = (formik.values.priceCartridge / formik.values.resourceCartridge) * (5 / formik.values.fillingOutSheet);
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
    'Заправка',
    formik.values.partNumberCartridge,
    formik.values.resourceCartridge,
    (formik.values.resource || 0) / ((formik.values.resourceCartridge || 1) * 5 / 8),
    formik.values.priceCartridge
  ]

  const table1 = useRef(null)
  const table2 = useRef(null)

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
                      <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps('resource')}/>
                      <TextField variant="filled" label="Заполнение листа" size="small" {...formik.getFieldProps('fillingOutSheet')}/>
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
                          <TextField variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceCartridge')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceCartridge')}/>
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
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePaperFeedUnit1')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePaperFeedUnit1')}/>
                      </Fields>
                      <SubTitle>
                          Отделение
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPaperFeedUnit2')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePaperFeedUnit2')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePaperFeedUnit2')}/>
                      </Fields>
                      <SubTitle>
                          Протяжка
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPaperFeedUnit3')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePaperFeedUnit3')}/>
                          <TextField variant="filled" label="Цена"
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
                          <TextField variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceADFNode1')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('priceADFNode1')}/>
                      </Fields>
                      <SubTitle>
                          Отделение
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberADFNode2')}/>
                          <TextField variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceADFNode2')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('priceADFNode2')}/>
                      </Fields>
                      <SubTitle>
                          Протяжка
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberADFNode3')}/>
                          <TextField variant="filled" label="Ресурс"
                                     size="small" {...formik.getFieldProps('resourceADFNode3')}/>
                          <TextField variant="filled" label="Цена"
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
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit1')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnit1')}/>
                      </Fields>
                      <SubTitle>
                          Ракель
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnit2')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit2')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnit2')}/>
                      </Fields>
                      <SubTitle>
                          Ролик заряда/коротрон
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnit3')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit3')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
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
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnit4')} disabled={!formik.values.checkboxPhotoreceptorUnit}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePhotoreceptorUnit4')} disabled={!formik.values.checkboxPhotoreceptorUnit}/>
                      </Fields>
                      <SubTitle>
                          Узел в сборе
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPhotoreceptorUnitFull')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePhotoreceptorUnitFull')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
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
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock1')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlock1')}/>
                      </Fields>
                      <SubTitle>
                          Доктор
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlock2')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock2')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlock2')}/>
                      </Fields>
                      <SubTitle>
                          Девелопер
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlock3')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock3')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
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
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlock4')} disabled={!formik.values.checkboxDevelopmentBlock}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'priceDevelopmentBlock4')} disabled={!formik.values.checkboxDevelopmentBlock}/>
                      </Fields>
                      <SubTitle>
                          Узел в сборе
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberDevelopmentBlockFull')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourceDevelopmentBlockFull')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
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
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit1')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit1')}/>
                      </Fields>
                      <SubTitle>
                          Вал прижимной
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit2')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit2')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit2')}/>
                      </Fields>
                      <SubTitle>
                          Подшипник левый
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit3')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit3')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit3')}/>
                      </Fields>
                      <SubTitle>
                          Подшипник правый
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit4')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit4')}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit4')}/>
                      </Fields>
                      <SubTitle>
                          Палец отделения
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnit5')}
                          />
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit5')} />
                          <TextField variant="filled" label="Цена"
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
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnit6')} disabled={!formik.values.checkboxPinningUnit}/>
                          <TextField variant="filled" label="Цена"
                                     size="small" {...formik.getFieldProps('pricePinningUnit6')}
                                     disabled={!formik.values.checkboxPinningUnit}/>
                      </Fields>
                      <SubTitle>
                          Узел в сборе
                      </SubTitle>
                      <Fields>
                          <TextField variant="filled" label="Part number" size="small" {...formik.getFieldProps(
                            'partNumberPinningUnitFull')}/>
                          <TextField variant="filled" label="Ресурс" size="small" {...formik.getFieldProps(
                            'resourcePinningUnitFull')}/>
                          <TextField variant="filled" label="Цена" size="small" {...formik.getFieldProps(
                            'pricePinningUnitFull')}/>
                      </Fields>
                  </>}
                </CustomCardContent>
              {isOpenPinningUnit && <CardActions>
                  <Button type="submit">
                      Сделать расчет
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
                          {cartridge.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
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
