const fs = require('fs');
const path = require('path');
const otbm2json = require("./OTBM2JSON/otbm2json");

const inputFolder = './input';
const outputFolder = './output';

// Ensure output folder exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Function to convert an individual OTBM file
function convertOTBM(inputPath, outputPath) {
    // Read the map data using the otbm2json library
    const mapData = otbm2json.read(inputPath);

    // converting to 7.6
    mapData.data.itemsMinorVersion = 3;

    // iterating through tiles converting items
    mapData.data.nodes.forEach(function (x) {
        x.features.forEach(function (x) {
            if (x.type !== otbm2json.HEADERS.OTBM_TILE_AREA) return;
            if (x.tiles == undefined) return;

            x.tiles.forEach(function (x) {
                if ((x.type !== otbm2json.HEADERS.OTBM_TILE) && (x.type !== otbm2json.HEADERS.OTBM_HOUSETILE)) return;

                if (x.tileid) {
                    x.tileid = convertId(x.tileid);
                    //removing invalid ids
                    if (x.tileid == 6666) {
                        delete x.tileid;
                    }
                }

                if (x.items) {
                    x.items.forEach(function (x) {
                        if (x.id) {
                            // TO DO: if mud wall, remove border items
                            x.id = convertId(x.id);
                            //removing invalid ids
                            if (x.id == 6666) {
                                delete x.id;
                            }
                        }

                        if (x.content) {
                            x.content.forEach(function (x) {
                                x.id = convertId(x.id);
                                if (x.content) {
                                    x.content.forEach(function (x) {
                                        x.id = convertId(x.id);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    // Extract the original map name from the input path
    const originalMapName = path.basename(inputPath, path.extname(inputPath));

    // Construct the new output path with the original map name
    const newOutputPath = path.join(outputFolder, `converted_${originalMapName}.otbm`);

    // Write the modified map data to the output file
    otbm2json.write(newOutputPath, mapData);
}

// Function to convert all OTBM files in the input folder
function convertAllOTBMFiles() {
    // Read the list of files in the input folder
    const files = fs.readdirSync(inputFolder);

    // Iterate through each file
    files.forEach((file) => {
        // Ensure it's an OTBM file
        if (path.extname(file).toLowerCase() === '.otbm') {
            // Construct full paths for input and output
            const inputPath = path.join(inputFolder, file);
            const outputPath = path.join(outputFolder, file);

            // Convert the OTBM file
            convertOTBM(inputPath, outputPath);
        }
    });
}

var start = Date.now();

// converting all OTBM files in the input folder
convertAllOTBMFiles();

console.log("Finished conversion in " + (Date.now() - start) + "ms.");
console.log("Total process took less than " + Math.ceil((Date.now() - start) / 1000) + "s.");

// Returns an integer between min, max (inclusive)
function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Return a random element based on a weight
function getWeightedRandom(weights) {
    // Draw a random sample
    var value = Math.random();
    var sum = 0;

    for (var i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (value < sum) {
            return weights[i].id;
        }
    }
    return weights[1].id;
}


function convertId(id) {
	switch(id) {
		case 392:
			return 383;
			break;
		case 489:
			return 482;
			break;
		case 490:
			return 4608;
			break;
			
			
		// EDIT
		case 5484:
			return 6567;
			break;
		
		
		
		
		// WATER IDS FOR media
		
		 case 5090:
    case 5091:
    case 5092:
    case 5093:
    case 5094:
    case 5095:
    case 5096:
    case 5097:
    case 5098:
    case 5099:
    case 5100:
    case 5101:
    case 5102:
    case 5103:
    case 5104:
    case 5105:
    case 5106:
    case 5107:
    case 5108:
    case 5109:
    case 5110:
    case 5111:
    case 5112:
    case 5113:
    case 5114:
    case 5115:
    case 5116:
    case 5117:
    case 5118:
    case 5119:
    case 5120:
    case 5121:
    case 5122:
    case 5123:
    case 5124:
    case 5125:
    case 5126:
    case 5127:
    case 5128:
    case 5129:
    case 5130:
    case 5131:
    case 5132:
    case 5133:
    case 5134:
    case 5135:
    case 5136:
    case 5137:
    case 5138:
    case 5139:
    case 5140:
    case 5141:
    case 5142:
    case 5143:
    case 5144:
    case 5145:
    case 5146:
    case 5147:
    case 5148:
    case 5149:
    case 5150:
    case 5151:
    case 5152:
    case 5153:
    case 5154:
    case 5155:
    case 5156:
    case 5157:
    case 5158:
    case 5159:
    case 5160:
    case 5161:
    case 5162:
    case 5163:
    case 5164:
    case 5165:
    case 5166:
    case 5167:
    case 5168:
    case 5169:
    case 5170:
    case 5171:
    case 5172:
    case 5173:
    case 5174:
    case 5175:
    case 5176:
    case 5177:
    case 5178:
    case 5179:
    case 5180:
    case 5181:
    case 5182:
    case 5183:
    case 5184:
    case 5185:
    case 5186:
    case 5187:
    case 5188:
    case 5189:
    case 5190:
    case 5191:
    case 5192:
    case 5193:
    case 5194:
    case 5195:
    case 5196:
    case 5197:
    case 5198:
    case 5199:
    case 5200:
    case 5201:
    case 5202:
    case 5203:
    case 5204:
    case 5205:
    case 5206:
    case 5207:
    case 5208:
    case 5209:
    case 5210:
    case 5211:
    case 5212:
    case 5213:
    case 5214:
    case 5215:
    case 5216:
    case 5217:
    case 5218:
    case 5219:
    case 5220:
    case 5221:
    case 5222:
    case 5223:
    case 5224:
    case 5225:
    case 5226:
    case 5227:
    case 5228:
    case 5229:
    case 5230:
    case 5231:
    case 5232:
    case 5233:
    case 5234:
    case 5235:
    case 5236:
    case 5237:
    case 5238:
    case 5239:
    case 5240:
    case 5241:
    case 5242:
    case 5243:
    case 5244:
    case 5245:
    case 5246:
    case 5247:
    case 5248:
    case 5249:
    case 5250:
    case 5251:
    case 5252:
    case 5253:
    case 5254:
    case 5255:
    case 5256:
    case 5257:
    case 5258:
    case 5259:
    case 5260:
    case 5261:
    case 5262:
    case 5263:
    case 5264:
    case 5265:
    case 5266:
    case 5267:
    case 5268:
    case 5269:
    case 5270:
    case 5271:
    case 5272:
    case 5273:
    case 5274:
    case 5275:
    case 5276:
    case 5277:
    case 5278:
    case 5279:
    case 5280:
    case 5281:
    case 5282:
    case 5283:
    case 5284:
    case 5285:
    case 5286:
    case 5287:
    case 5288:
    case 5289:
    case 5290:
    case 5291:
    case 5292:
    case 5293:
    case 5294:
    case 5295:
    case 5296:
    case 5297:
    case 5298:
    case 5299:
    case 5300:
    case 5301:
    case 5302:
    case 5303:
    case 5304:
    case 5305:
    case 5306:
    case 5307:
    case 5308:
    case 5309:
    case 5310:
    case 5311:
    case 5312:
    case 5313:
    case 5314:
    case 5315:
    case 5316:
    case 5317:
    case 5318:
    case 5319:
    case 5320:
    case 5321:
    case 5322:
    case 5323:
    case 5324:
    case 5325:
    case 5326:
    case 5327:
    case 5328:
    case 5329:
    case 5330:
    case 5331:
    case 5332:
    case 5333:
    case 5334:
    case 5335:
    case 5336:
    case 5337:
    case 5338:
    case 5339:
    case 5340:
    case 5341:
    case 5342:
    case 5343:
    case 5344:
    case 5345:
    case 5346:
    case 5347:
    case 5348:
    case 5349:
    case 5350:
    case 5351:
    case 5352:
    case 5353:
    case 5354:
    case 5355:
    case 5356:
    case 5357:
    case 5358:
    case 5359:
    case 5360:
    case 5361:
    case 5362:
    case 5363:
    case 5364:
    case 5365:
    case 5366:
    case 5367:
    case 5368:
    case 5369:
    case 5370:
    case 5371:
    case 5372:
    case 5373:
    case 5374:
    case 5375:
    case 5376:
    case 5377:
    case 5378:
    case 5379:
    case 5380:
    case 5381:
    case 5382:
    case 5383:
    case 5384:
    case 5385:
    case 5386:
    case 5387:
    case 5388:
    case 5389:
    case 5390:
    case 5391:
    case 5392:
    case 5393:
    case 5394:
    case 5395:
    case 5396:
    case 5397:
    case 5398:
    case 5399:
    case 5400:
    case 5401:
    case 5402:
    case 5403:
    case 5404:
    case 5405:
    case 5406:
    case 5407:
    case 5408:
    case 5409:
    case 5410:
    case 5411:
    case 5412:
    case 5413:
    case 5414:
    case 5415:
    case 5416:
    case 5417:
    case 5418:
    case 5419:
    case 5420:
    case 5421:
    case 5422:
    case 5423:
    case 5424:
    case 5425:
    case 5426:
    case 5427:
    case 5428:
    case 5429:
    case 5430:
    case 5431:
    case 5432:
    case 5433:
    case 5434:
    case 5435:
    case 5436:
    case 5437:
    case 5438:
    case 5439:
    case 5440:
    case 5441:
    case 5442:
    case 5443:
    case 5444:
    case 5445:
    case 5446:
    case 5447:
    case 5448:
    case 5449:
    case 5450:
    case 5451:
    case 5452:
    case 5453:
    case 5454:
    case 5455:
    case 5456:
    case 5457:
    case 5458:
    case 5459:
    case 5460:
    case 5461:
    case 5462:
    case 5463:
    case 5464:
    case 5465:
    case 5466:
    case 5467:
    case 5468:
    case 5469:
    case 5470:
    case 5471:
    case 5472:
    case 5473:
    case 5474:
    case 5475:
    case 5476:
    case 5477:
    case 5478:
    case 5479:
    case 5480:
    case 5481:
    case 5482:
    case 5483:
    case 5484:
    case 5485:
    case 5486:
    case 5487:
    case 5488:
    case 5489:
    case 5490:
    case 5491:
    case 5492:
    case 5493:
    case 5494:
    case 5495:
    case 5496:
    case 5497:
    case 5498:
    case 5499:
    case 5500:
    case 5501:
    case 5502:
    case 5503:
    case 5504:
    case 5505:
    case 5506:
    case 5507:
    case 5508:
    case 5509:
    case 5510:
    case 5511:
    case 5512:
    case 5513:
    case 5514:
    case 5515:
    case 5516:
    case 5517:
    case 5518:
    case 5519:
    case 5520:
    case 5521:
    case 5522:
    case 5523:
    case 5524:
    case 5525:
    case 5526:
    case 5527:
    case 5528:
    case 5529:
    case 5530:
    case 5531:
    case 5532:
    case 5533:
    case 5534:
	return 0;
	break;
		
		//
		case 6216:
		case 5441:
		case 7397:
		case 7401:
		case 7400:
		case 7584:
		case 7777:
		case 7936:
		case 7746:
		case 5944:
		case 7882:
		case 5944:
		case 7771:
		case 7749:
		case 7876:
		case 5440:
			return 0;
			break;
		case 24304:
			return 0;
			break;
		case 6219:
			return 0;
			break;
		case 6218:
			return 0;
			break;
		case 5739:
			return 2743;
			break;
		case 7024:
			return 3622;
			break;
		case 8623:
			return 351;
			break;
		case 8637:
			return 351;
			break;
		case 6233:
			return 351;
			break;
		case 7122:
			return 3622;
			break;
		case 7126:
			return 3614;
			break;
		case 7121:
			return 3614;
			break;
		case 7123:
			return 3614;
			break;
		case 7124:
			return 3614;
			break;
		case 7125:
			return 3614;
			break;
		case 6211:
			return 1284;
			break;
		case 6210:
			return 1284;
			break;
		case 6212:
			return 1284;
			break;
		case 6859:
			return 0;
			break;	
		case 6859:
			return 0;
			break;	
		case 6856:
			return 0;
			break;	
		case 6841:
			return 0;
			break;	
		case 6856:
			return 0;
			break;	
		case 6861:
			return 0;
			break;	
		case 5664:
			return 2755;
			break;		
		case 5660:
			return 0;
			break;	
		case 6840:
			return 0;
			break;
		case 6839:
			return 0;
			break;		
		case 5587:
			return 1794;
			break;
		case 5588:
			return 1795;
			break;
		case 5589:
			return 1796;
			break;	
		case 5590:
			return 1797;
			break;
		case 5590:
			return 1797;
			break;
		case 5591:
			return 1798;
			break;
		case 5592:
			return 1799;
			break;
		case 5593:
			return 1800;
			break;
		case 5594:
			return 1801;
			break;
		case 5595:
			return 1802;
			break;
		case 5732:
			return 1547;
			break;
		case 6509:
			return 2007;
			break;
		case 6104:
			return 2250;
			break;
		case 7372:
			return 2229;
			break;
		case 5475:
			return 2320;
			break;
		case 7824:
			return 3700;
			break;
		case 6986:
			return 2320;
			break;
		case 6379:
			return 0;
			break;
		case 6374:
			return 0;
			break;
		case 6378:
			return 0;
			break;	
		case 6382:
			return 0;
			break;
		case 5856:
			return 0;
			break;
		case 5708:
			return 0;
			break;
		case 5621:
			return 0;
			break;
		case 5619:
			return 0;
			break;
		case 5623:
			return 0;
			break;
		case 5709:
			return 0;
			break;
		case 6376:
			return 0;
			break;
		case 6375:
			return 0;
			break;
		case 6380:
			return 0;
			break;
		case 6383:
			return 0;
			break;
		case 5854:
			return 0;
			break;
		case 6377:
			return 0;
			break;
		case 5622:
			return 0;
			break;
		case 5624:
			return 0;
			break;
		case 6972:
			return 0;
			break;
		case 5772:
			return 0;
			break;
		case 5773:
			return 0;
			break;
		case 5774:
			return 0;
			break;
		case 5662:
			return 0;
			break;	
		case 8770:
			return 0;
			break;
		case 8771:
			return 0;
			break;	
		case 8772:
			return 0;
			break;	
		case 8773:
			return 0;
			break;	
		case 8774:
			return 0;
			break;	
		case 8775:
			return 0;
			break;	
		case 8776:
			return 0;
			break;	
		case 8291:
			return 0;
			break;	
		case 7536:
			return 0;
			break;
		case 7538:
			return 0;
			break;
		case 7540:
			return 0;
			break;
		case 7541:
			return 0;
			break;
		case 7537:
			return 0;
			break;	
		case 6229:
			return 0;
			break;	
		case 6984:
			return 0;
			break;	
		case 8632:
			return 0;
			break;	
		case 5707:
			return 0;
			break;	
		case 5560:
			return 0;
			break;	
		case 5561:
			return 0;
			break;	
		case 5302:
			return 0;
			break;	
		case 5299:
			return 0;
			break;	
		case 7716:
			return 0;
			break;
		case 8732:
			return 0;
			break;
		case 8731:
			return 0;
			break;
		case 8733:
			return 0;
			break;
		case 5558:
			return 0;
			break;
		case 5560:
			return 0;
			break;
		case 5868:
			return 0;
			break;
		case 5867:
			return 0;
			break;
		case 5866:
			return 0;
			break;
		case 5663:
			return 0;
			break;	
		case 5559:
			return 0;
			break;
		case 5557:
			return 0;
			break;	
		case 5665:
			return 0;
			break;
		case 5569:
			return 0;
			break;
		case 5571:
			return 0;
			break;	
		case 5572:
			return 0;
			break;	
		case 5575:
			return 0;
			break;	
		case 5577:
			return 0;
			break;	
		case 5570:
			return 0;
			break;	
		case 5574:
			return 0;
			break;	
		case 5576:
			return 0;
			break;	
		case 5573:
			return 0;
			break;	
		case 5852:
			return 0;
			break;	
		case 5858:
			return 0;
			break;	
		case 5560:
			return 0;
			break;
		case 5562:
			return 0;
			break;	
		case 5563:
			return 0;
			break;	
		case 5561:
			return 0;
			break;	
		case 5698:
			return 0;
			break;	
		case 5700:
			return 0;
			break;	
		case 5699:
			return 0;
			break;	
		case 5611:
			return 0;
			break;	
		case 5612:
			return 0;
			break;	
		case 5613:
			return 0;
			break;	
		case 5610:
			return 0;
			break;	
		case 5549:
			return 0;
			break;	
		case 5551:
			return 0;
			break;	
		case 5552:
			return 0;
			break;	
		case 5550:
			return 0;
			break;	
		case 5583:
			return 0;
			break;	
		case 5581:
			return 0;
			break;	
		case 5586:
			return 0;
			break;	
		case 5585:
			return 0;
			break;	
		case 5582:
			return 0;
			break;	
		case 5579:
			return 0;
			break;	
		 case 7130:
    case 7131:
    case 7132:
    case 7133:
    case 7134:
    case 7135:
    case 7136:
    case 7137:
    case 7138:
    case 7139:
    case 7140:
    case 7141:
    case 7142:
    case 7143:
    case 7144:
	case 8220:
	case 8219:
			return 0;
			break;	

		case 10433:
			return 1218;
			break;	
		case 10434:
			return 1216;
			break;	
		case 7813:
			return 1760;
			break;	
		case 7814:
			return 1761;
			break;	
		case 7817:
			return 1760;
			break;	
		case 7818:
			return 1761;
			break;	
		
			
		case 5360:
			return 1429;
			break;		
			
			
		 case 11856:
    case 11857:
    case 11858:
    case 11859:
    case 11860:
    case 11861:
    case 11862:
    case 11863:
    case 11864:
    case 11865:
    case 11866:
    case 11867:
    case 11868:
    case 11869:
    case 11870:
    case 11871:
    case 11872:
    case 11873:
    case 11874:
    case 11875:
    case 11876:
    case 11877:
    case 11878:
    case 11879:
    case 11880:
    case 11881:
    case 11882:
    case 11883:
    case 11884:
    case 11885:
    case 11886:
    case 11887:
    case 11888:
    case 11889:
    case 11890:
    case 11891:
    case 11892:
    case 11893:
    case 11894:
    case 11895:
    case 11896:
    case 11897:
    case 11898:
    case 11899:
    case 11900:
    case 11901:
    case 11902:
    case 11903:
    case 11904:
    case 11905:
    case 11906:
    case 11907:
			return 1284;
			break;	
			
	

		case 4632:
			return 607;
			break;	
		case 4633:
			return 609;
			break;	
		case 4634:
			return 606;
			break;	
		case 4635:
			return 608;
			break;	
		case 4636:
			return 614;
			break;	
			
		case 4637:
			return 615;
			break;	
		case 4638:
			return 617;
			break;	
		case 4639:
			return 616;
			break;	
		case 4640:
			return 610;
			break;	
		case 4641:
			return 611;
			break;	
		case 4642:
			return 613;
			break;	
		case 4643:
			return 612;
			break;	
			
			

		case 10345:
			return 3766;
			break;	
			
		case 6160:
			return 4791;
			break;	
			
			
			
		case 6161:
			return 4786;
			break;	
				
		case 6162:
			return 4790;
			break;	
				
			
		case 6163:
			return 4789;
			break;	
				
		case 6164:
			return 4784;
			break;	
				
		case 6165:
			return 4788;
			break;	
				
		case 6166:
			return 4785;
			break;	
				
		case 6167:
			return 4787;
			break;	
				
		case 6168:
			return 4795;
			break;	
				
		case 6169:
			return 4794;
			break;		
		
		case 6170:
			return 4793;
			break;	

		case 6171:
			return 4792;
			break;	
		
		case 6172:
			return 106;
			break;	
		
			
	
		case 5325:
		case 5328:
		case 6217:
		case 6218:
		case 6219:
		case 6220:
		case 6221:
		case 6222:
		case 6223:
		case 6224:
		case 6225:
		case 6226:
		case 6227:
		case 6228:
		case 6229:
		case 5504:
		case 6231:
		case 3843:
		case 5300:
		case 5301:
		case 5297:
		case 5296:
		case 6182:

		case 7842:
		case 7841:
		case 7543:
		case 7542:
		case 8633:
		case 8288:
		case 6109:
		case 6385:
		case 7962:
		case 7551:
		case 8212:
		case 8215:
		 case 6180:
    case 6181:
    case 6182:
    case 6183:
    case 6184:
    case 6185:
    case 6186:
    case 6187:
    case 6188:
    case 6189:
    case 6190:
    case 6191:
        // Hand
			return 0;
			break;	
	
		case 6451:
			return 1264;
			break;	
		case 6151:
			return 1036;
			break;	
		case 6188:
			return 0;
			break;
			
		case 6450:
			return 1263;
			break;
				case 5500:
				return 1617;
			break;	
		case 5501:	
			return 1618;
			break;	
			
		case 5502:
				return 1620;
			break;	
		case 5503:	
			return 1621;
			break;		
			
		
case 5502:
				return 1754;
			break;	
		case 5503:	
			return 1755;
			break;			
			
		case 7819:
			return 1754;
			break;	
		case 7820:
			return 1755;
			break;
			
		case 7143:
			return 1217;
			break;	
		case 8313:
			return 2741;
			break;	
		case 8314:
			return 2740;
			break;
		case 5281:
			return 1217;
			break;	
		case 5972:
			return 2747;
			break;	
		case 5584:
			return 0;
			break;	
		case 5580:
			return 0;
			break;	
		case 5915:
			return 0;
			break;	
		case 5578:
			return 0;
			break;	
		case 5860:
			return 0;
			break;	
		case 9727:
			return 103;
			break;
			
		case 5535:
    case 5536:
    case 5537:
    case 5538:
    case 5539:
    case 5540:
    case 5541:
    case 5542:
    case 5543:
    case 5544:
    case 5545:
    case 5546:
    case 5547:
    case 5548:
    case 5549:
    case 5550:
    case 5551:
    case 5552:
    case 5553:
    case 5554:
    case 5555:
    case 5556:
    case 5557:
    case 5558:
    case 5559:
    case 5560:
    case 5561:
    case 5562:
    case 5563:
    case 5564:
    case 5565:
    case 5566:
    case 5567:
    case 5568:
    case 5569:
    case 5570:
    case 5571:
    case 5572:
    case 5573:
    case 5574:
    case 5575:
    case 5576:
    case 5577:
    case 5578:
    case 5579:
    case 5580:
    case 5581:
    case 5582:
    case 5583:
    case 5584:
    case 5585:
    case 5586:
    case 5587:
    case 5588:
    case 5589:
    case 5590:
    case 5591:
    case 5592:
    case 5593:
    case 5594:
    case 5595:
    case 5596:
    case 5597:
    case 5598:
    case 5599:
    case 5600:
    case 5601:
    case 5602:
    case 5603:
    case 5604:
    case 5605:
    case 5606:
    case 5607:
    case 5608:
    case 5609:
    case 5610:
    case 5611:
    case 5612:
    case 5613:
    case 5614:
    case 5615:
    case 5616:
    case 5617:
    case 5618:
    case 5619:
    case 5620:
    case 5621:
    case 5622:
    case 5623:
    case 5624:
    case 5625:
    case 5626:
    case 5627:
    case 5628:
    case 5629:
    case 5630:
 
    case 5655:
    case 5656:
    case 5657:
    case 5658:
    case 5659:
    case 5660:
    case 5661:

    case 5663:
    case 5664:
    case 5665:
    case 5666:
    case 5667:
    case 5668:
    case 5669:
    case 5670:
    case 5671:
    case 5672:
    case 5673:
    case 5674:
    case 5675:
    case 5676:
    case 5677:
    case 5678:
    case 5679:
    case 5680:
    case 5681:
    case 5682:

    case 5687:
    case 5688:
    case 5689:
    case 5690:
    case 5691:
    case 5692:
    case 5693:
    case 5694:
    case 5695:
    case 5696:
    case 5697:
    case 5698:
    case 5699:
    case 5700:
    case 5701:
    case 5702:
    case 5703:
    case 5704:
    case 5705:
    case 5706:
    case 5707:
    case 5708:
    case 5709:
    case 5710:
   
    case 5727:
    case 5728:
    case 5729:
    case 5730:
    case 5731:
    case 5732:
    case 5733:
    case 5734:
    case 5735:
    case 5736:
    case 5737:
    case 5738:

    case 5740:
    case 5741:
    case 5742:
    case 5743:
    case 5744:
    case 5745:
    case 5746:
    case 5747:
    case 5748:
    case 5749:
    case 5750:
    case 5751:
    case 5752:
 case 6280:
 case 6381:
 case 6386:
 case 6384:
 case 6452:
    case 6453:
    case 6454:
    case 6455:
    case 6456:
    case 6457:
    case 6458:
    case 6459:
    case 6460:
    case 6461:
    case 6462:
    case 6463:
    case 6464:
    case 6465:
    case 6466:
    case 6467:
    case 6468:
    case 6469:
    case 6470:
    case 6471:
    case 6472:
    case 6473:
    case 6474:
    case 6475:
    case 6476:
    case 6477:
    case 6478:
    case 6479:
    case 6480:
    case 6481:
    case 6482:
    case 6483:
    case 6484:
    case 6485:
    case 6486:
    case 6487:
    case 6488:
    case 6489:
    case 6490:
    case 6491:
    case 6492:
    case 6493:
    case 6494:
    case 6495:
    case 6496:
    case 6497:
    case 6498:
    case 6499:
    case 6500:
    case 6501:
    case 6502:
    case 6503:
    case 6504:
    case 6505:
    case 6506:
    case 6507:
    case 6508:
    case 6509:
    case 6510:
    case 6511:
    case 6512:
    case 6513:
    case 6514:
    case 6515:
    case 6516:
    case 6517:
    case 6518:
    case 6519:
    case 6520:
    case 6521:
    case 6522:
    case 6523:
    case 6524:
    case 6525:
    case 6526:
    case 6527:
    case 6528:
    case 6529:
    case 6530:
    case 6531:
    case 6532:
    case 6533:
    case 6534:
    case 6535:
    case 6536:
    case 6537:
    case 6538:
    case 6539:
    case 6540:
    case 6541:
    case 6542:
    case 6543:
    case 6544:
    case 6545:
    case 6546:
    case 6547:
    case 6548:
    case 6549:
    case 6550:
    case 6551:
    case 6552:
    case 6553:
    case 6554:
    case 6555:
    case 6556:
    case 6557:
    case 6558:
    case 6559:
    case 6560:
    case 6561:
    case 6562:
    case 6563:
    case 6564:
   case 7089:
    case 7090:
    case 7091:
    case 7092:
    case 7093:
    case 7094:
    case 7095:
    case 7096:
    case 7097:
    case 7098:
    case 7099:
    case 7100:
    case 7101:
    case 7102:
    case 7103:
    case 7104:
    case 7105:
    case 7106:
    case 7107:
    case 7108:
    case 7109:
    case 7110:
    case 7111:
    case 7112:
    case 7113:
    case 7114:
    case 7115:
    case 7116:
    case 7117:
    case 7118:
    case 7119:
    case 7120:
    case 7121:
    case 7122:
    case 7123:
    case 7124:
    case 7125:
    case 7126:
    case 7127:
    case 7128:
    case 7129:
    case 6281:
    case 6282:
    case 6283:
    case 6284:
    case 6285:
    case 6286:
    case 6287:
    case 6288:
    case 6289:
    case 6290:
    case 6291:
    case 6292:
    case 6293:
    case 6294:
    case 6295:
    case 6296:
    case 6297:
    case 6298:
    case 6299:
    case 6300:
    case 6301:
    case 6302:
    case 6303:
    case 6304:
    case 6305:
    case 6306:
    case 6307:
    case 6308:
    case 6309:
    case 6310:
    case 6311:
	case 5753:
    case 5754:
    case 5755:
    case 5756:
    case 5757:
    case 5758:
    case 5759:
    case 5760:
    case 5761:
    case 5762:
    case 5763:
    case 5764:
    case 5765:
    case 5766:
    case 5767:
    case 5768:
    case 5769:
    case 5770:
    case 5771:
    case 5772:
    case 5773:
    case 5774:
    case 5775:
    case 5776:
    case 5777:
    case 5778:
    case 5779:
    case 5780:
    case 5781:
    case 5782:
    case 5783:
    case 5784:
    case 5785:
    case 5786:
    case 5787:
    case 5788:
    case 5789:
    case 5790:
    case 5791:
    case 5792:
    case 5793:
    case 5794:
    case 5795:
    case 5796:
    case 5797:
    case 5798:
    case 5799:
    case 5800:
    case 5801:
    case 5802:
    case 5803:
    case 5804:
    case 5805:
    case 5806:
    case 5807:
    case 5808:
    case 5809:
    case 5810:
    case 5811:
    case 5812:
    case 5813:
    case 5814:

    case 5816:
    case 5817:
    case 5818:
    case 5819:
    case 5820:
    case 5821:
    case 5822:
    case 5823:
    case 5824:
    case 5825:
    case 5826:
    case 5827:
    case 5828:
    case 5829:
    case 5830:
    case 5831:
    case 5832:
    case 5833:
    case 5834:
    case 5835:
    case 5836:
    case 5837:
    case 5838:
    case 5839:
    case 5840:
    case 5841:
    case 5842:
    case 5843:
    case 5844:
    case 5845:
    case 5846:
    case 5847:
    case 5848:
    case 5849:
    case 5850:
    case 5851:
    case 5852:
    case 5853:
    case 5854:
    case 5855:
    case 5856:
    case 5857:
    case 5858:
    case 5859:	
	case 5860:
    case 5861:
    case 5862:
    case 5863:
    case 5864:
    case 5865:
    case 5866:
    case 5867:
    case 5868:
    case 5869:
    case 5870:
    case 5871:
    case 5872:
    case 5873:
    case 5874:
    case 5875:
    case 5876:
    case 5877:
    case 5878:
    case 5879:
    case 5880:
    case 5881:
    case 5882:
    case 5883:
    case 5884:
    case 5885:
    case 5886:
    case 5887:
    case 5888:
    case 5889:
    case 5890:
    case 5891:
    case 5892:
    case 5893:
    case 5894:
    case 5895:
    case 5896:
    case 5897:
    case 5898:
    case 5899:
    case 5900:
    case 5901:
    case 5902:
    case 5903:
    case 5904:
    case 5905:
    case 5906:
    case 5907:
    case 5908:
    case 5909:
    case 5910:
    case 5911:
    case 5912:
    case 5913:
    case 5914:
    case 5915:
    case 5916:
    case 5917:
    case 5918:
    case 5919:
    case 5920:
    case 5921:
    case 5922:
    case 5923:
    case 5924:
    case 5925:
	case 5315:
	case 5316:
	case 5317:
	case 5318:
	case 5319:
	case 5320:
	case 5321:
	case 5322:
	case 5323:
	case 5324:
	case 5325:
	case 5326:
	case 5327:
	case 5328:
	case 5329:
	case 5330:
	case 5331:
	case 6981:
	case 6982:
	case 6983:
	case 6986:
	case 6984:
	case 6985:
	 case 9337:
    case 9338:
    case 9339:
    case 9340:
    case 9341:
    case 9342:
    case 9343:
    case 9344:
    case 9345:
    case 9346:
    case 9347:
    case 9348:
    case 9349:
    case 9350:
    case 9351:
    case 9352:
    case 9353:
    case 9354:
    case 9355:
    case 9356:
    case 9357:
    case 9358:
    case 9359:
    case 9360:
    case 9361:
    case 9362:
    case 9363:
    case 9364:
    case 9365:
    case 9366:
    case 9367:
    case 9368:
		
	 case 8033:
    case 8034:
    case 8035:
    case 8036:
    case 8037:
    case 8038:
    case 8039:
    case 8040:
    case 8041:
    case 8042:
    case 8043:
    case 8044:
    case 8045:
   case 7145:
    case 7146:
    case 7147:
    case 7148:
    case 7149:
    case 7150:
    case 7151:
    case 7152:
    case 7153:
    case 7154:
    case 7155:
    case 7156:
    case 7157:	
 case 10213:
    case 10214:
    case 10215:
    case 10216:
    case 10217:
	case 9483:
	case 9484:
	case 9727:
	case 9728:
	case 7712:
	case 7713:
	case 7714:
	case 7715:
	case 7716:
	case 7717:
	case 7718:
	 case 8388:
    case 8389:
    case 8390:
    case 8391:
    case 8392:
    case 8393:
    case 8394:
    case 8395:
    case 8396:
    case 8397:
    case 8398:
    case 8399:
    case 8400:
    case 8401:
    case 8402:
    case 8403:
    case 8404:
    case 8405:
    case 8406:
    case 8407:
    case 8408:
    case 8409:
    case 8410:
    case 8411:
    case 8412:
    case 8413:
    case 8414:
    case 8415:
	 case 8009:
    case 8010:
    case 8011:
    case 8012:
    case 8013:
    case 8014:
	   case 7504:
    case 7505:
    case 7506:
    case 7507:
    case 7508:
    case 7509:
    case 7510:
    case 7511:
    case 7512:
    case 7513:
    case 7514:
    case 7515:
    case 7516:
    case 7517:
    case 7518:
    case 7519:
	 case 9759:
    case 9760:
    case 9761:
    case 9762:
    case 9763:
    case 9764:
    case 9765:
    case 9766:
	
	
	   case 7605:
    case 7606:
    case 7607:
    case 7608:
    case 7609:
    case 7610:
    case 7611:
    case 7612:
    case 7613:
    case 7614:
    case 7615:
    case 7616:
	  case 6750:
    case 6751:
    case 6752:
    case 6753:
    case 6754:
    case 6755:
    case 6756:
    case 6757:
    case 6758:
    case 6759:
    case 6760:
	
	
	
	
	case 6750:
    case 6751:
    case 6752:
    case 6753:
    case 6754:
    case 6755:
    case 6756:
    case 6757:
    case 6758:
    case 6759:
    case 6760:
	case 6993:
	case 6994:
	case 6995:
	case 6996:
	case 6997:
	case 6998:
	case 6972:
	case 6110:
	case 6111:
	case 6112:
	 case 8220:
    case 8221:
    case 8222:
    case 8223:
    case 8224:
    case 8225:
    case 8226:
    case 8227:
    case 8228:
    case 8229:
    case 8230:
	 case 8210:
    case 8211:
    case 8212:
    case 8213:
    case 8214:
    case 8215:
    case 8216:
    case 8217:
    case 8218:
    case 8219:
	case 8128:
	case 8130:
	case 8126:
	case 8131:
	case 8238:
	case 8240:
	case 8238:
	case 8655:
	case 8675:
	case 8656:
	case 8166:
	case 10436:
	case 10438:
	case 10440:
	case 7575:
	case 7576:
	case 7571:
	case 7577:
	case 7578:
	case 8237:
	case 8239:
	case 8232:
	case 8797:
	case 8798:
	case 8167:
	case 8242:
	case 8241:
	case 5392:
	case 25299:
	case 17751:
	case 8232:
	case 8233:
	case 8234:
	case 8636:
	case 8640:
	case 9521:
	case 8140:
	case 8141:
	case 8142:
	case 8143:
	case 8156:
	case 8157:
	case 8158:
	case 8159:
	case 7932:
	case 7273:
	case 3815:
	case 3813:
	case 9569:
	case 9751:
	case 7274:
	case 7275:
	case 7276:
        return 0;
        break;		
	
	
	case 5405:
	case 5406:
	case 5407:
	case 5408:
	case 5409:
	case 5410:
        return 493;
        break;


		
	case 8785:
    case 8786:
    case 8787:
    case 8788:
    case 8789:
    case 8790:
    case 8791:
    case 8792:
    case 8793:
    case 8794:
    case 8795:
    case 8796:
	return 2718;
	break;


    case 8785:
    case 8786:
    case 8787:
    case 8788:
    case 8789:
    case 8790:
    case 8791:
    case 8792:
    case 8793:
    case 8794:
    case 8795:
    case 8796:
	return 231;
	break;


 case 5332:
    case 5333:
    case 5334:
    case 5335:
    case 5336:
    case 5337:
    case 5338:
    case 5339:
    case 5340:
    case 5341:
    case 5342:
    case 5343:
    case 5344:
    case 5345:
    case 5346:
    case 5347:
    case 5348:
    case 5349:
    case 5350:
    case 5351:
    case 5352:
    case 5353:
    case 5354:
    case 5355:
    case 5356:
    case 5357:
    case 5358:
    case 5359:
    case 5360:
    case 5361:
    case 5362:
    case 5363:
    case 5364:
    case 5365:
    case 5366:
    case 5367:
    case 5368:
    case 5369:
    case 5370:
    case 5371:
    case 5372:
    case 5373:
    case 5374:
    case 5375:
    case 5376:
    case 5377:
    case 5378:
    case 5379:
    case 5380:
    case 5381:
    case 5382:
    case 5383:
    case 5384:
    case 5385:
    case 5386:
    case 5387:
    case 5388:
    case 5389:
	return 1429;
        break;
		
	
	  case 9575:
    case 9576:
    case 9577:
    case 9578:
    case 9579:
    case 9580:
    case 9581:
    case 9582:
	
	case 9768:
    case 9769:
    case 9770:
    case 9771:
	return 1480;
	break;

		 case 5711:
    case 5712:
    case 5713:
    case 5714:
    case 5715:
    case 5716:
    case 5717:
    case 5718:
    case 5719:
    case 5720:
    case 5721:
    case 5722:
    case 5723:
    case 5724:
    case 5725:
    case 5726:
	 return 101;
        break;				
					
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		case 491:
			return 4609;
			break;
		case 492:
			return 4610;
			break;
		case 618:
			return 4611;
			break;
		case 619:
			return 4612;
			break;
		case 620:
			return 4613;
			break;
		case 621:
			return 4614;
			break;
		case 622:
			return 4615;
			break;
		case 623:
			return 4616;
			break;
		case 624:
			return 4608;
			break;
		case 625:
			return 4609;
			break;
		case 626:
			return 4610;
			break;
		case 627:
			return 4611;
			break;
		case 628:
			return 4612;
			break;
		case 629:
			return 4613;
			break;
		case 695:
			return 406;
			break;
		case 696:
			return 407;
			break;
		case 1492:
			return 1487;
			break;
		case 1493:
			return 1488;
			break;
		case 1494:
			return 1489;
			break;
		case 1495:
			return 1491;
			break;
		case 1496:
			return 1490;
			break;
		case 1500:
			return 1487;
			break;
		case 1501:
			return 1488;
			break;
		case 1502:
			return 1489;
			break;
		case 1503:
			return 1490;
			break;
		case 1504:
			return 1491;
			break;
		case 4404:
			return 3744;
			break;
		case 4617:
			return 4608;
			break;
		case 4618:
			return 4609;
			break;
		case 4619:
			return 4610;
			break;
		case 4620:
			return 4611;
			break;
		case 4621:
			return 4612;
			break;
		case 4622:
			return 4613;
			break;
		case 4623:
			return 4614;
			break;
		case 4624:
			return 4615;
			break;
		case 4625:
			return 4616;
			break;
		case 4664:
			return 4614;
			break;
		case 4665:
			return 4615;
			break;
		case 4666:
			return 4616;
			break;
		case 4820:
			return 4608;
			break;
		case 4821:
			return 4609;
			break;
		case 4822:
			return 4610;
			break;
		case 4823:
			return 4611;
			break;
		case 4824:
			return 4612;
			break;
		case 4825:
			return 4613;
			break;
		case 5023:
			return 1387;
			break;
		case 5024:
			return 1387;
			break;
		case 5025:
			return 3744;
			break;
		case 5026:
			return 3744;
			break;
		case 5027:
			return 3744;
			break;
		case 5028:
			return 3744;
			break;
		case 5029:
			return 3744;
			break;
		case 5030:
			return 3744;
			break;
		case 5031:
			return 3744;
			break;
		case 5032:
			return 3744;
			break;
		case 5033:
			return 3744;
			break;
		case 5034:
			return 3744;
			break;
		case 5035:
			return 3744;
			break;
		case 5036:
			return 3744;
			break;
		case 5037:
			return 3744;
			break;
		case 5038:
			return 3744;
			break;
		case 5039:
			return 3744;
			break;
		case 5040:
			return 3744;
			break;
		case 5041:
			return 3744;
			break;
		case 5042:
			return 3744;
			break;
		case 5043:
			return 3744;
			break;
		case 5044:
			return 3744;
			break;
		case 5098:
			return 1212;
			break;
		case 5099:
			return 1213;
			break;
		case 5100:
			return 1214;
			break;
		case 5101:
			return 1221;
			break;
		case 5102:
			return 1222;
			break;
		case 5103:
			return 1229;
			break;
		case 5104:
			return 1230;
			break;
		case 5105:
			return 1225;
			break;
		case 5106:
			return 1226;
			break;
		case 5107:
			return 1209;
			break;
		case 5108:
			return 1210;
			break;
		case 5109:
			return 1211;
			break;
		case 5110:
			return 1219;
			break;
		case 5111:
			return 1220;
			break;
		case 5112:
			return 1227;
			break;
		case 5113:
			return 1228;
			break;
		case 5114:
			return 1223;
			break;
		case 5115:
			return 1224;
			break;
		case 5116:
			return 1212;
			break;
		case 5117:
			return 1213;
			break;
		case 5118:
			return 1214;
			break;
		case 5119:
			return 1221;
			break;
		case 5120:
			return 1222;
			break;
		case 5121:
			return 1229;
			break;
		case 5122:
			return 1230;
			break;
		case 5123:
			return 1225;
			break;
		case 5124:
			return 1226;
			break;
		case 5125:
			return 1209;
			break;
		case 5126:
			return 1210;
			break;
		case 5127:
			return 1211;
			break;
		case 5128:
			return 1219;
			break;
		case 5129:
			return 1220;
			break;
		case 5130:
			return 1227;
			break;
		case 5131:
			return 1228;
			break;
		case 5132:
			return 1223;
			break;
		case 5133:
			return 1224;
			break;
		case 5134:
			return 1212;
			break;
		case 5135:
			return 1213;
			break;
		case 5136:
			return 1214;
			break;
		case 5137:
			return 1209;
			break;
		case 5138:
			return 1210;
			break;
		case 5139:
			return 1211;
			break;
		case 5146:
			return 1037;
			break;
		case 5147:
			return 1037;
			break;
		case 5148:
			return 1037;
			break;
		case 5149:
			return 1036;
			break;
		case 5150:
			return 1036;
			break;
		case 5151:
			return 1036;
			break;
		case 5152:
			return 1037;
			break;
		case 5153:
			return 1037;
			break;
		case 5154:
			return 1036;
			break;
		case 5155:
			return 1036;
			break;
		case 5256:
			return 3392;
			break;
		case 5257:
			return 3376;
			break;
		case 5258:
			return 3688;
			break;
		case 5259:
			return 1385;
			break;
		case 5260:
			return 3688;
			break;
		case 5261:
			return 3517;
			break;
		case 5262:
			return 3509;
			break;
		case 5263:
			return 3511;
			break;
		case 5264:
			return 3509;
			break;
		case 5265:
			return 3530;
			break;
		case 5266:
			return 3517;
			break;
		case 5267:
			return 3530;
			break;
		case 5268:
			return 3517;
			break;
		case 5269:
			return 3530;
			break;
		case 5270:
			return 3509;
			break;
		case 5271:
			return 3530;
			break;
		case 5272:
			return 3508;
			break;
		case 5286:
			return 1221;
			break;
		case 5273:
			return 3508;
			break;
		case 5274:
			return 3516;
			break;
		case 5275:
			return 3516;
			break;
		case 5276:
			return 3499;
			break;
		case 5277:
			return 3502;
			break;
		case 5303:
			return 1269;
			break;
		case 5304:
			return 1270;
			break;
		case 5321:
			return 1038;
			break;
		case 5322:
			return 1038;
			break;
		case 5323:
			return 1038;
			break;
		case 5324:
			return 1038;
			break;
		case 5400:
			return 3392;
			break;
		case 5401:
			return 3376;
			break;
		case 5402:
			return 3744;
			break;
		case 5403:
			return 3744;
			break;
		case 5404:
			return 3744;
			break;
		case 5405:
			return 355;
			break;
		case 5406:
			return 354;
			break;
		case 5407:
			return 353;
			break;
		case 5408:
			return 352;
			break;
		case 5409:
			return 352;
			break;
		case 5410:
			return 351;
			break;
		case 5421:
			return 2776;
			break;
		case 5415:
			return 2776;
			break;
		case 5416:
			return 2776;
			break;
			
		case 7552:
			return 2776;
			break;
		case 7553:
			return 2771;
			break;
		case 5423:
			return 2776;
			break;
		case 5422:
			return 2772;
			break;
		case 5420:
			return 2773;
			break;
		case 5419:
			return 2775;
			break;
		case 5418:
			return 2779;
			break;
		case 5417:
			return 2780;
			break;
		
		case 5414:
			return 2776;
			break;
		case 5413:
			return 2778;
			break;
		case 5412:
			return 2776;
			break;
		case 5411:
			return 2775;
			break;
		case 5451:
			return 2777;
			break;	
		case 5444:
			return 2776;
			break;	


		case 5427:
			return 4796;
			break;
		case 5428:
			return 4798;
			break;
		case 5429:
			return 4797;
			break;
		case 5430:
			return 4799;
			break;
		case 5431:
			return 4807;
			break;
		case 5432:
			return 4806;
			break;
		case 5433:
			return 4805;
			break;
		case 5434:
			return 4804;
			break;
		case 5435:
			return 4803;
			break;
		case 5436:
			return 4802;
			break;
		case 5437:
			return 4800;
			break;
		case 5438:
			return 4801;
			break;
		case 5478:
			return 3392;
			break;
		case 5479:
			return 3376;
			break;
		case 5519:
			return 3361;
			break;
		case 5520:
			return 3365;
			break;
		case 5543:
			return 1386;
			break;
		case 5631:
			return 358;
			break;
		case 5632:
			return 356;
			break;
		case 5633:
			return 366;
			break;
		case 5634:
			return 367;
			break;
		case 5635:
			return 364;
			break;
		case 5636:
			return 365;
			break;
		case 5637:
			return 359;
			break;
		case 5638:
			return 357;
			break;
		case 5639:
			return 373;
			break;
		case 5640:
			return 371;
			break;
		case 5641:
			return 374;
			break;
		case 5642:
			return 372;
			break;
		case 5643:
			return 381;
			break;
		case 5644:
			return 382;
			break;
		case 5645:
			return 379;
			break;
		case 5646:
			return 380;
			break;
		case 5647:
			return 360;
			break;
		case 5648:
			return 375;
			break;
		case 5649:
			return 362;
			break;
		case 5650:
			return 363;
			break;
		case 5651:
			return 361;
			break;
		case 5652:
			return 376;
			break;
		case 5653:
			return 377;
			break;
		case 5654:
			return 378;
			break;
		case 5683:
			return 356;
			break;
		case 5684:
			return 356;
			break;
		case 5685:
			return 358;
			break;
		case 5686:
			return 358;
			break;
		case 5711:
			return 101;
			break;
		case 5712:
			return 101;
			break;
		case 5713:
			return 101;
			break;
		case 5714:
			return 101;
			break;
		case 5715:
			return 101;
			break;
		case 5716:
			return 101;
			break;
		case 5717:
			return 101;
			break;
		case 5718:
			return 101;
			break;
		case 5719:
			return 101;
			break;
		case 5720:
			return 101;
			break;
		case 5721:
			return 101;
			break;
		case 5722:
			return 101;
			break;
		case 5723:
			return 101;
			break;
		case 5724:
			return 101;
			break;
		
		case 5726:
			return 101;
			break;
		case 5731:
			return 482;
			break;
		case 5743:
			return 405;
			break;
		case 5744:
			return 3139;
			break;
		case 5745:
			return 369;
			break;
		case 5746:
			return 4972;
			break;
		case 5768:
			return 1284;
			break;
		case 5769:
			return 1284;
			break;
		case 5770:
			return 1284;
			break;
		case 5814:
			return 919;
			break;
		case 5815:
			return 355;
			break;
		case 5816:
			return 4796;
			break;
		case 5817:
			return 4797;
			break;
		case 5818:
			return 4798;
			break;
		case 5819:
			return 4799;
			break;
		case 5820:
			return 4803;
			break;
		case 5821:
			return 4802;
			break;
		case 5822:
			return 4800;
			break;
		case 5823:
			return 4801;
			break;
		case 5824:
			return 4807;
			break;
		case 5825:
			return 4806;
			break;
		case 5826:
			return 4805;
			break;
		case 5827:
			return 4804;
			break;
		case 5828:
			return 4514;
			break;
		case 5829:
			return 4515;
			break;
		case 5830:
			return 4516;
			break;
		case 5831:
			return 4517;
			break;
		case 5832:
			return 4520;
			break;
		case 5833:
			return 4521;
			break;
		case 5834:
			return 4518;
			break;
		case 5835:
			return 4519;
			break;
		case 5836:
			return 4522;
			break;
		case 5837:
			return 4523;
			break;
		case 5838:
			return 4524;
			break;
		case 5839:
			return 4525;
			break;
		case 6127:
			return 459;
			break;
		case 6128:
			return 459;
			break;
		case 6129:
			return 383;
			break;
		case 6130:
			return 383;
			break;
		case 6133:
			return 1036;
			break;
		case 6134:
			return 1037;
			break;
		case 6135:
			return 1038;
			break;
		case 6136:
			return 1037;
			break;
		case 6137:
			return 1036;
			break;
		case 6139:
			return 1038;
			break;
		case 6140:
			return 1037;
			break;
		case 6141:
			return 1040;
			break;
		case 6142:
			return 1036;
			break;
		case 6143:
			return 1040;
			break;
		case 6144:
			return 1036;
			break;
		case 6145:
			return 1040;
			break;
		case 6146:
			return 1037;
			break;
		case 6147:
			return 1040;
			break;
		case 6148:
			return 1037;
			break;
		case 6149:
			return 1036;
			break;
		case 6150:
			return 1040;
			break;
		case 6152:
			return 1037;
			break;
		case 6173:
			return 924;
			break;
		case 6174:
			return 924;
			break;
		case 6175:
			return 1216;
			break;
		case 6176:
			return 1218;
			break;
		case 6178:
			return 1263;
			break;
		case 6179:
			return 1264;
			break;
		case 6192:
			return 1209;
			break;
		case 6193:
			return 1210;
			break;
		case 6194:
			return 1211;
			break;
		case 6195:
			return 1212;
			break;
		case 6196:
			return 1213;
			break;
		case 6197:
			return 1214;
			break;
		case 6198:
			return 1219;
			break;
		case 6199:
			return 1220;
			break;
		case 6200:
			return 1221;
			break;
		case 6201:
			return 1222;
			break;
		case 6202:
			return 1223;
			break;
		case 6203:
			return 1224;
			break;
		case 6204:
			return 1225;
			break;
		case 6205:
			return 1226;
			break;
		case 6206:
			return 1227;
			break;
		case 6207:
			return 1228;
			break;
		case 6208:
			return 1229;
			break;
		case 6209:
			return 1230;
			break;
		case 6232:
			return 1215;
			break;
		case 6233:
			return 1217;
			break;
			case 6249:
			return 1209;
			break;
		case 6250:
			return 1210;
			break;
		case 6251:
			return 1211;
			break;
		case 6252:
			return 1212;
			break;
		case 6253:
			return 1213;
			break;
		case 6254:
			return 1214;
			break;
		case 6255:
			return 1219;
			break;
		case 6256:
			return 1220;
			break;
		case 6257:
			return 1221;
			break;
		case 6258:
			return 1222;
			break;
		case 6259:
			return 1223;
			break;
		case 6260:
			return 1224;
			break;
		case 6261:
			return 1225;
			break;
		case 6262:
			return 1226;
			break;
		case 6263:
			return 1227;
			break;
		case 6264:
			return 1228;
			break;
		case 6265:
			return 1229;
			break;
		case 6266:
			return 1230;
			break;
		case 6281:
			return 1026;
			break;
		case 6282:
			return 1025;
			break;
		case 6283:
			return 1026;
			break;
		case 6284:
			return 1025;
			break;
		case 6389:
			return 413;
			break;
		case 6353:
			return 4701;
			break;
		case 6436:
			return 1263;
			break;
		case 6437:
			return 1264;
			break;
		case 6438:
			return 1263;
			break;
		case 6439:
			return 1264;
			break;
		case 6440:
			return 1265;
			break;
		case 6441:
			return 1266;
			break;
		case 6442:
			return 1265;
			break;
		case 6443:
			return 1266;
			break;
		case 6444:
			return 1267;
			break;
		case 6445:
			return 1268;
			break;
		case 6446:
			return 1267;
			break;
		case 6447:
			return 1268;
			break;
		case 6466:
			return 3392;
			break;
		case 6467:
			return 3376;
			break;
		case 6468:
			return 3392;
			break;
		case 6469:
			return 3376;
			break;
		case 6470:
			return 3499;
			break;
		case 6471:
			return 3502;
			break;
		case 6472:
			return 3499;
			break;
		case 6473:
			return 3502;
			break;

		case 6080:
			return 2317;
			break;
		case 6081:
			return 3065;
			break;
		case 6082:
			return 3060;
			break;
		case 6083:
			return 3065;
			break;
		case 6084:
			return 3066;
			break;
		case 6448:
			return 1269;
			break;
		case 6449:
			return 1270;
			break;
		case 6560:
			return 3065;
			break;
		case 6580:
			return 670;
			break;
		case 6581:
			return 670;
			break;
		case 6582:
			return 670;
			break;
		case 6583:
			return 670;
			break;
		case 6584:
			return 670;
			break;
		case 6585:
			return 670;
			break;
		case 6586:
			return 670;
			break;
		case 6587:
			return 670;
			break;
		case 6588:
			return 670;
			break;
		case 6589:
			return 670;
			break;
		case 6590:
			return 670;
			break;
		case 6591:
			return 670;
			break;
		case 6592:
			return 670;
			break;
		case 6593:
			return 670;
			break;
		case 6594:
			return 670;
			break;
		case 6595:
			return 670;
			break;
		case 6596:
			return 670;
			break;
		case 6597:
			return 670;
			break;
		case 6598:
			return 670;
			break;
		case 6599:
			return 670;
			break;
		case 6600:
			return 670;
			break;
		case 6601:
			return 670;
			break;
		case 6602:
			return 670;
			break;
		case 6603:
			return 670;
			break;
		case 6604:
			return 670;
			break;
		case 6605:
			return 670;
			break;
		case 6606:
			return 670;
			break;
		case 6607:
			return 670;
			break;
		case 6608:
			return 670;
			break;
		case 6627:
			return 4644;
			break;
		case 6628:
			return 4645;
			break;
		case 6629:
			return 4646;
			break;
		case 6630:
			return 4647;
			break;
		case 6631:
			return 4651;
			break;
		case 6632:
			return 4650;
			break;
		case 6633:
			return 4649;
			break;
		case 6634:
			return 4648;
			break;
		case 6635:
			return 4652;
			break;
		case 6636:
			return 4653;
			break;
		case 6637:
			return 4655;
			break;
		case 6638:
			return 4654;
			break;
		case 6639:
			return 4644;
			break;
		case 6640:
			return 4645;
			break;
		case 6641:
			return 4646;
			break;
		case 6642:
			return 4647;
			break;
		case 6643:
			return 4648;
			break;
		case 6644:
			return 4649;
			break;
		case 6645:
			return 4650;
			break;
		case 6646:
			return 4651;
			break;
		case 6647:
			return 4652;
			break;
		case 6648:
			return 4653;
			break;
		case 6649:
			return 4654;
			break;
		case 6650:
			return 4655;
			break;
		case 6651:
			return 4644;
			break;
		case 6652:
			return 4645;
			break;
		case 6653:
			return 4646;
			break;
		case 6654:
			return 4647;
			break;
		case 6655:
			return 4644;
			break;
		case 6656:
			return 4645;
			break;
		case 6657:
			return 4646;
			break;
		case 6658:
			return 4647;
			break;
		case 6659:
			return 4644;
			break;
		case 6660:
			return 4645;
			break;
		case 6661:
			return 4646;
			break;
		case 6662:
			return 4647;
			break;
		case 6663:
			return 4644;
			break;
		case 6664:
			return 4645;
			break;
		case 6665:
			return 4646;
			break;
		case 6666:
			return 4647;
			break;
		case 6667:
			return 4644;
			break;
		case 6668:
			return 4645;
			break;
		case 6669:
			return 4646;
			break;
		case 6670:
			return 4647;
			break;
		case 6671:
			return 4644;
			break;
		case 6672:
			return 4645;
			break;
		case 6673:
			return 4646;
			break;
		case 6674:
			return 4647;
			break;
		case 6675:
			return 4737;
			break;
		case 6676:
			return 4740;
			break;
		case 6677:
			return 4747;
			break;
		case 6678:
			return 4745;
			break;
		case 6679:
			return 4746;
			break;
		case 6680:
			return 4743;
			break;
		case 6681:
			return 4742;
			break;
		case 6682:
			return 4741;
			break;
		case 6683:
			return 671;
			break;
		case 6684:
			return 671;
			break;
		case 6685:
			return 671;
			break;
		case 6686:
			return 671;
			break;
		case 6687:
			return 4739;
			break;
		case 6688:
			return 4645;
			break;
		case 6689:
			return 4646;
			break;
		case 6690:
			return 4738;
			break;
		case 6691:
			return 4739;
			break;
		case 6692:
			return 4645;
			break;
		case 6693:
			return 4646;
			break;
		case 6694:
			return 4738;
			break;
		case 6719:
			return 4472;
			break;
		case 6720:
			return 4471;
			break;
		case 6721:
			return 4473;
			break;
		case 6722:
			return 4474;
			break;
		case 6723:
			return 4475;
			break;
		case 6724:
			return 4476;
			break;
		case 6725:
			return 4477;
			break;
		case 6726:
			return 4478;
			break;
		case 6727:
			return 4479;
			break;
		case 6728:
			return 4468;
			break;
		case 6729:
			return 4469;
			break;
		case 6730:
			return 4470;
			break;
		case 6731:
			return 4469;
			break;
		case 6732:
			return 4479;
			break;
		case 6733:
			return 4468;
			break;
		case 6734:
			return 4479;
			break;
		case 6735:
			return 4468;
			break;
		case 6736:
			return 4479;
			break;
		case 6737:
			return 4468;
			break;
		case 6738:
			return 4479;
			break;
		case 6763:
			return 915;
			break;
		case 6764:
			return 915;
			break;
		case 6765:
			return 917;
			break;
		case 6766:
			return 916;
			break;
		case 6767:
			return 917;
			break;
		case 6822:
			return 358;
			break;
		case 6823:
			return 356;
			break;
		case 6824:
			return 359;
			break;
		case 6825:
			return 357;
			break;
		case 6826:
			return 366;
			break;
		case 6827:
			return 367;
			break;
		case 6828:
			return 364;
			break;
		case 6829:
			return 365;
			break;
		case 6830:
			return 360;
			break;
		case 6831:
			return 361;
			break;
		case 6832:
			return 362;
			break;
		case 6833:
			return 363;
			break;
		case 6834:
			return 356;
			break;
		case 6835:
			return 356;
			break;
		case 6836:
			return 358;
			break;
		case 6837:
			return 358;
			break;
			case 6838:
			return 670;
			break;
		case 6869:
			return 919;
			break;
		case 6967:
			return 671;
			break;
		case 6909:
			return 1388;
			break;
		case 6910:
			return 1389;
			break;
		case 6911:
			return 1390;
			break;
		case 6912:
			return 1391;
			break;
		case 6913:
			return 1392;
			break;
		case 6914:
			return 1393;
			break;
		case 6915:
			return 1394;
			break;
		case 6916:
			return 1395;
			break;
		case 6917:
			return 479;
			break;
		case 6918:
			return 480;
			break;
		case 6919:
			return 484;
			break;
		case 6920:
			return 484;
			break;
		case 6921:
			return 476;
			break;
		case 6922:
			return 475;
			break;
		case 6923:
			return 459;
			break;
		case 6924:
			return 459;
			break;
		case 6925:
			return 919;
			break;
		case 7060:
			return 914;
			break;
		case 7061:
			return 916;
			break;
		case 7062:
			return 4571;
			break;
		case 7063:
			return 4572;
			break;
		case 7064:
			return 4573;
			break;
		case 7065:
			return 4574;
			break;
		case 7066:
			return 4575;
			break;
		case 7067:
			return 4554;
			break;
		case 7068:
			return 4555;
			break;
		case 7069:
			return 4556;
			break;
		case 7070:
			return 4557;
			break;
		case 7071:
			return 4558;
			break;
		case 7072:
			return 4559;
			break;
		case 7073:
			return 4560;
			break;
		case 7074:
			return 4561;
			break;
		case 7075:
			return 4562;
			break;
		case 7076:
			return 4563;
			break;
		case 7077:
			return 4564;
			break;
		case 7078:
			return 4565;
			break;
		case 7079:
			return 4554;
			break;
		case 7080:
			return 4555;
			break;
		case 7081:
			return 4556;
			break;
		case 7082:
			return 4557;
			break;
		case 7083:
			return 4558;
			break;
		case 7084:
			return 4559;
			break;
		case 7085:
			return 4560;
			break;
		case 7086:
			return 4561;
			break;
		case 7087:
			return 4562;
			break;
		case 7088:
			return 4563;
			break;
		case 7089:
			return 4564;
			break;
		case 7090:
			return 4565;
			break;
		case 7102:
			return 359;
			break;
		case 7103:
			return 359;
			break;
		case 7104:
			return 357;
			break;
		case 7105:
			return 357;
			break;
		case 7187:
			return 442;
			break;
		case 7188:
			return 436;
			break;
		case 7190:
			return 445;
			break;
		case 7191:
			return 434;
			break;
		case 7192:
			return 435;
			break;
		case 7193:
			return 443;
			break;
		case 7194:
			return 437;
			break;
		case 7195:
			return 444;
			break;
		case 7196:
			return 438;
			break;
		case 7197:
			return 441;
			break;
		case 7198:
			return 439;
			break;
		case 7199:
			return 440;
			break;
		case 7201:
			return 442;
			break;
		case 7202:
			return 436;
			break;
		case 7203:
			return 445;
			break;
		case 7204:
			return 434;
			break;
		case 7205:
			return 435;
			break;
		case 7206:
			return 443;
			break;
		case 7207:
			return 437;
			break;
		case 7208:
			return 444;
			break;
		case 7209:
			return 438;
			break;
		case 7210:
			return 441;
			break;
		case 7211:
			return 439;
			break;
		case 7212:
			return 440;
			break;
		case 7272:
			return 405;
			break;
		case 7348:
			return 431;
			break;
		case 7350:
			return 491;
			break;
		case 7351:
			return 407;
			break;
		case 7352:
			return 103;
			break;
		case 7353:
			return 413;
			break;
		case 7354:
			return 355;
			break;
		case 7355:
			return 3152;
			break;
		case 7356:
			return 4405;
			break;
		case 7357:
			return 3139;
			break;
		case 7358:
			return 420;
			break;
		case 7588:
			return 2006;
			break;
		case 7589:
			return 2006;
			break;
		case 7590:
			return 2006;
			break;
		case 7591:
			return 2006;
			break;
		case 7618:
			return 2006;
			break;
		case 7620:
			return 2006;
			break;
		case 7634:
			return 2006;
			break;
		case 7635:
			return 2006;
			break;
		case 7636:
			return 2006;
			break;
		case 7641:
			return 4514;
			break;
		case 7642:
			return 4515;
			break;
		case 7643:
			return 4516;
			break;
		case 7644:
			return 4517;
			break;
		case 7645:
			return 4518;
			break;
		case 7646:
			return 4519;
			break;
		case 7647:
			return 4520;
			break;
		case 7648:
			return 4521;
			break;
		case 7649:
			return 4522;
			break;
		case 7650:
			return 4523;
			break;
		case 7651:
			return 4524;
			break;
		case 7652:
			return 4525;
			break;
		case 7653:
			return 4542;
			break;
		case 7654:
			return 4796;
			break;
		case 7656:
			return 4545;
			break;
		case 7657:
			return 4546;
			break;
		case 7658:
			return 4547;
			break;
		case 7659:
			return 4548;
			break;
		case 7660:
			return 4549;
			break;
		case 7661:
			return 4550;
			break;
		case 7662:
			return 4551;
			break;
		case 7663:
			return 4552;
			break;
		case 7664:
			return 4553;
			break;
		case 7666:
			return 4799;
			break;
		case 7667:
			return 4800;
			break;
		case 7668:
			return 4801;
			break;
		case 7669:
			return 4802;
			break;
		case 7671:
			return 4804;
			break;
		case 7672:
			return 4805;
			break;
		case 7709:
			return 4544;
			break;
		case 7710:
			return 4543;
			break;
		case 7833:
			return 4798;
			break;
		case 7834:
			return 4797;
			break;
		case 7835:
			return 4803;
			break;
		case 7836:
			return 4806;
			break;
		case 7837:
			return 4807;
			break;
		case 7924:
			return 1392;
			break;
		case 7925:
			return 1388;
			break;
		case 7943:
			return 4632;
			break;
		case 7975:
			return 101;
			break;
		case 7944:
			return 4633;
			break;
		case 7945:
			return 4634;
			break;
		case 7946:
			return 4635;
			break;
		case 7947:
			return 4636;
			break;
		case 7948:
			return 4637;
			break;
		case 7949:
			return 4638;
			break;
		case 7950:
			return 4639;
			break;
		case 7951:
			return 4640;
			break;
		case 7952:
			return 4641;
			break;
		case 7953:
			return 4642;
			break;
		case 7954:
			return 4643;
			break;
		case 7976:
			return 101;
			break;
		case 7987:
			return 904;
			break;
		case 7988:
			return 4472;
			break;
		case 7989:
			return 4471;
			break;
		case 7990:
			return 4471;
			break;
		case 7991:
			return 4471;
			break;
		case 7992:
			return 4472;
			break;
		case 7993:
			return 4472;
			break;
		case 7994:
			return 4473;
			break;
		case 7995:
			return 4475;
			break;
		case 7996:
			return 4474;
			break;
		case 7997:
			return 904;
			break;
		case 7998:
			return 905;
			break;
		case 7999:
			return 908;
			break;
		case 8000:
			return 904;
			break;
		case 8001:
			return 904;
			break;
		case 8002:
			return 907;
			break;
		case 8003:
			return 908;
			break;
		case 8004:
			return 907;
			break;
		case 8005:
			return 908;
			break;
		case 8006:
			return 907;
			break;
		case 8007:
			return 904;
			break;
		case 8008:
			return 907;
			break;
		case 8015:
			return 908;
			break;
		case 8017:
			return 908;
			break;
		case 8018:
			return 917;
			break;
		case 8019:
			return 915;
			break;
		case 8053:
			return 891;
			break;
		case 8054:
			return 894;
			break;
		case 8055:
			return 893;
			break;
		case 8056:
			return 892;
			break;
		case 8057:
			return 898;
			break;
		case 8117:
			return 899;
			break;
		case 8118:
			return 900;
			break;
		case 8119:
			return 902;
			break;
		case 8120:
			return 901;
			break;
		case 8133:
			return 919;
			break;
		case 8135:
			return 4476;
			break;
		case 8136:
			return 4477;
			break;
		case 8137:
			return 4478;
			break;
		case 8138:
			return 4479;
			break;
		case 8168:
			return 4468;
			break;
		case 8169:
			return 4469;
			break;
		case 8170:
			return 4835;
			break;
		case 8256:
			return 383;
			break;
		case 8260:
			return 919;
			break;
		case 8268:
			return 3900;
			break;
		case 8275:
			return 100;
			break;
		case 8276:
			return 369;
			break;
		case 8277:
			return 369;
			break;
		case 8278:
			return 384;
			break;
		case 8279:
			return 369;
			break;
		case 8280:
			return 409;
			break;
		case 8281:
			return 410;
			break;
		case 8282:
			return 411;
			break;
		case 8283:
			return 423;
			break;
		case 8284:
			return 427;
			break;
		case 8285:
			return 428;
			break;
		case 8286:
			return 429;
			break;
		case 8287:
			return 448;
			break;
		case 8292:
			return 280;
			break;
		case 8294:
			return 1049;
			break;
		case 8295:
			return 1050;
			break;
		case 8315:
			return 231;
			break;
		case 8316:
			return 231;
			break;
		case 8317:
			return 231;
			break;
		case 8318:
			return 231;
			break;
		case 8319:
			return 231;
			break;
		case 8320:
			return 231;
			break;
		case 8321:
			return 231;
			break;
		case 8322:
			return 231;
			break;
		case 8326:
			return 106;
			break;
		case 8327:
			return 106;
			break;
		case 8328:
			return 106;
			break;
		case 8329:
			return 106;
			break;
		case 8330:
			return 106;
			break;
		case 8331:
			return 106;
			break;
		case 8332:
			return 106;
			break;
		case 8333:
			return 106;
			break;
		case 8334:
			return 106;
			break;
		case 8335:
			return 4772;
			break;
		case 8336:
			return 4773;
			break;
		case 8337:
			return 4774;
			break;
		case 8338:
			return 4775;
			break;
		case 8339:
			return 4776;
			break;
		case 8340:
			return 4777;
			break;
		case 8341:
			return 4778;
			break;
		case 8342:
			return 4779;
			break;
		case 8343:
			return 4780;
			break;
		case 8344:
			return 4781;
			break;
		case 8345:
			return 4782;
			break;
		case 8346:
			return 4783;
			break;
		case 8347:
			return 106;
			break;
		case 8348:
			return 106;
			break;
		case 8349:
			return 4784;
			break;
		case 8350:
			return 4787;
			break;
		case 8351:
			return 4788;
			break;
		case 8352:
			return 4789;
			break;
		case 8353:
			return 4790;
			break;
		case 8354:
			return 4791;
			break;
		case 8355:
			return 4792;
			break;
		case 8356:
			return 4793;
			break;
		case 8357:
			return 4794;
			break;
		case 8358:
			return 4795;
			break;
		case 8359:
			return 4786;
			break;
		case 8360:
			return 4785;
			break;
		case 8366:
			return 897;
			break;
		case 8367:
			return 895;
			break;
		case 8369:
			return 896;
			break;
		case 8371:
			return 4470;
			break;
		case 8372:
			return 1388;
			break;
		case 8373:
			return 1389;
			break;
		case 8374:
			return 1390;
			break;
		case 8375:
			return 1391;
			break;
		case 8376:
			return 1392;
			break;
		case 8377:
			return 1393;
			break;
		case 8378:
			return 1394;
			break;
		case 8379:
			return 1395;
			break;
		case 8423:
			return 103;
			break;
		case 8424:
			return 103;
			break;
		case 8425:
			return 103;
			break;
		case 8426:
			return 103;
			break;
		case 8427:
			return 103;
			break;
		case 8428:
			return 103;
			break;
		case 8429:
			return 103;
			break;
		case 8430:
			return 103;
			break;
		case 8431:
			return 103;
			break;
		case 8432:
			return 103;
			break;
		case 8433:
			return 103;
			break;
		case 8434:
			return 103;
			break;
		case 8435:
			return 4667;
			break;
		case 8436:
			return 4670;
			break;
		case 8437:
			return 4668;
			break;
		case 8438:
			return 4669;
			break;
		case 8439:
			return 4677;
			break;
		case 8440:
			return 4678;
			break;
		case 8441:
			return 4675;
			break;
		case 8442:
			return 4676;
			break;
		case 8443:
			return 4673;
			break;
		case 8444:
			return 4674;
			break;
		case 8445:
			return 4671;
			break;
		case 8446:
			return 4672;
			break;
		case 8447:
			return 4667;
			break;
		case 8448:
			return 4670;
			break;
		case 8449:
			return 4668;
			break;
		case 8450:
			return 4669;
			break;
		case 8451:
			return 4677;
			break;
		case 8452:
			return 4678;
			break;
		case 8453:
			return 4676;
			break;
		case 8454:
			return 4675;
			break;
		case 8455:
			return 4673;
			break;
		case 8456:
			return 4671;
			break;
		case 8457:
			return 4672;
			break;
		case 8458:
			return 4674;
			break;
		case 8475:
			return 3460;
			break;
		case 8476:
			return 3458;
			break;
		case 8477:
			return 3462;
			break;
		case 8478:
			return 3458;
			break;
		case 8479:
			return 3461;
			break;
		case 8480:
			return 3460;
			break;
		case 8481:
			return 3461;
			break;
		case 8482:
			return 3460;
			break;
		case 8483:
			return 3461;
			break;
		case 8484:
			return 3458;
			break;
		case 8485:
			return 3461;
			break;
		case 8486:
			return 3460;
			break;
		case 8487:
			return 3460;
			break;
		case 8488:
			return 3460;
			break;
		case 8489:
			return 3463;
			break;
		case 8490:
			return 3454;
			break;
		case 8491:
			return 3454;
			break;
		case 8492:
			return 3473;
			break;
		case 8493:
			return 3463;
			break;
		case 8494:
			return 3473;
			break;
		case 8495:
			return 3463;
			break;
		case 8496:
			return 3473;
			break;
		case 8497:
			return 3454;
			break;
		case 8498:
			return 3473;
			break;
		case 8499:
			return 3460;
			break;
		case 8500:
			return 3460;
			break;
		case 8501:
			return 3460;
			break;
		case 8502:
			return 3460;
			break;
		case 8503:
			return 3460;
			break;
		case 8504:
			return 3460;
			break;
		case 8505:
			return 3460;
			break;
		case 8506:
			return 3460;
			break;
		case 8507:
			return 3460;
			break;
		case 8508:
			return 3460;
			break;
		case 8509:
			return 3458;
			break;
		case 8510:
			return 3458;
			break;
		case 8511:
			return 3458;
			break;
		case 8512:
			return 3458;
			break;
		case 8513:
			return 3458;
			break;
		case 8514:
			return 3458;
			break;
		case 8515:
			return 3458;
			break;
		case 8516:
			return 3458;
			break;
		case 8517:
			return 3458;
			break;
		case 8518:
			return 3458;
			break;
		case 8519:
			return 3458;
			break;
		case 8520:
			return 3458;
			break;
		case 8521:
			return 3458;
			break;
		case 8522:
			return 3463;
			break;
		case 8523:
			return 3463;
			break;
		case 8524:
			return 3454;
			break;
		case 8525:
			return 3454;
			break;
			case 8538:
			return 3766;
			break;
		case 8539:
			return 3766;
			break;
		case 8540:
			return 3766;
			break;
		case 8541:
			return 1209;
			break;
		case 8542:
			return 1210;
			break;
		case 8543:
			return 1211;
			break;
		case 8544:
			return 1212;
			break;
		case 8545:
			return 1213;
			break;
		case 8546:
			return 1214;
			break;
		case 8547:
			return 1219;
			break;
		case 8548:
			return 1220;
			break;
		case 8549:
			return 1221;
			break;
		case 8550:
			return 1222;
			break;
		case 8551:
			return 1223;
			break;
		case 8552:
			return 1224;
			break;
		case 8553:
			return 1225;
			break;
		case 8554:
			return 1226;
			break;
		case 8555:
			return 1227;
			break;
		case 8556:
			return 1228;
			break;
		case 8557:
			return 1229;
			break;
		case 8558:
			return 1230;
			break;
		case 8559:
			return 479;
			break;
		case 8560:
			return 480;
			break;
		case 8561:
			return 383;
			break;
		case 8562:
			return 383;
			break;
		case 8563:
			return 476;
			break;
		case 8564:
			return 475;
			break;
		case 8565:
			return 459;
			break;
		case 8566:
			return 459;
			break;
		case 8569:
			return 4576;
			break;
		case 8570:
			return 671;
			break;
		case 8577:
			return 100;
			break;
		case 8578:
			return 3263;
			break;
		case 8579:
			return 468;
			break;
		case 8580:
			return 430;
			break;
		case 8585:
			return 469;
			break;
		case 8586:
			return 351;
			break;
		case 8590:
			return 414;
			break;
		case 8591:
			return 4526;
			break;
		case 8592:
			return 384;
			break;
		case 8594:
			return 103;
			break;
		case 8595:
			return 405;
			break;
		case 8596:
			return 413;
			break;
		case 8599:
			return 1386;
			break;
		case 8671:
			return 2555;
			break;
		case 8708:
			return 4405;
			break;
		case 8913:
			return 918;
			break;
		case 8914:
			return 918;
			break;
		case 8915:
			return 918;
			break;
		case 8916:
			return 918;
			break;
		case 8917:
			return 918;
			break;
		case 9021:
			return 351;
			break;
		case 9022:
			return 352;
			break;
		case 9023:
			return 353;
			break;
		case 9024:
			return 354;
			break;
		case 9025:
			return 355;
			break;
		case 9026:
			return 101;
			break;
		case 9027:
			return 101;
			break;
		case 9028:
			return 101;
			break;
		case 9029:
			return 101;
			break;
		case 9030:
			return 101;
			break;
		case 9031:
			return 101;
			break;
		case 9032:
			return 101;
			break;
		case 9033:
			return 101;
			break;
		case 9034:
			return 101;
			break;
		case 9035:
			return 101;
			break;
		case 9036:
			return 101;
			break;
		case 9037:
			return 101;
			break;
		case 9038:
			return 101;
			break;
		case 9039:
			return 101;
			break;
		case 9040:
			return 101;
			break;
		case 9041:
			return 101;
			break;
		case 9042:
			return 101;
			break;
		case 9043:
			return 4526;
			break;
		case 9044:
			return 4527;
			break;
		case 9045:
			return 4528;
			break;
		case 9046:
			return 4529;
			break;
		case 9047:
			return 4530;
			break;
		case 9048:
			return 4531;
			break;
		case 9049:
			return 4532;
			break;
		case 9050:
			return 4533;
			break;
		case 9051:
			return 4534;
			break;
		case 9052:
			return 4535;
			break;
		case 9053:
			return 4536;
			break;
		case 9054:
			return 4537;
			break;
		case 9055:
			return 4538;
			break;
		case 9056:
			return 4539;
			break;
		case 9057:
			return 4540;
			break;
		case 9058:
			return 4541;
			break;
		case 9059:
			return 231;
			break;
		case 9067:
			return 405;
			break;
		case 9068:
			return 4570;
			break;
		case 9069:
			return 4571;
			break;
		case 9070:
			return 4572;
			break;
		case 9071:
			return 4573;
			break;
		case 9072:
			return 4574;
			break;
		case 9073:
			return 4575;
			break;
			case 9092:
			return 926;
			break;
		case 9093:
			return 926;
			break;
		case 9094:
			return 927;
			break;
		case 9095:
			return 927;
			break;
		case 9096:
			return 937;
			break;
		case 9097:
			return 937;
			break;
		case 9098:
			return 936;
			break;
		case 9099:
			return 936;
			break;
			case 9118:
			return 1025;
			break;
		case 9119:
			return 1026;
			break;
		case 9120:
			return 1027;
			break;
		case 9121:
			return 1028;
			break;
		case 9122:
			return 1029;
			break;
		case 9123:
			return 1030;
			break;
		case 9124:
			return 1031;
			break;
		case 9125:
			return 1032;
			break;
		case 9126:
			return 1033;
			break;
		case 9127:
			return 1034;
			break;
		case 9128:
			return 1035;
			break;
		case 9129:
			return 1025;
			break;
		case 9130:
			return 1025;
			break;
		case 9131:
			return 1025;
			break;
		case 9132:
			return 1025;
			break;
		case 9133:
			return 1025;
			break;
		case 9135:
			return 1026;
			break;
		case 9136:
			return 1026;
			break;
		case 9137:
			return 1026;
			break;
		case 9138:
			return 1026;
			break;
		case 9139:
			return 1026;
			break;
		case 9142:
			return 1025;
			break;
		case 9143:
			return 1026;
			break;
		case 9144:
			return 406;
			break;
		case 9145:
			return 406;
			break;
		case 9146:
			return 406;
			break;
		case 9159:
			return 3393;
			break;
		case 9160:
			return 1208;
			break;
		case 9161:
			return 1207;
			break;
		case 9162:
			return 3395;
			break;
		case 9163:
			return 1206;
			break;
		case 9164:
			return 1205;
			break;
		case 9165:
			return 1209;
			break;
		case 9166:
			return 1210;
			break;
		case 9167:
			return 1211;
			break;
		case 9168:
			return 1212;
			break;
		case 9169:
			return 1213;
			break;
		case 9170:
			return 1214;
			break;
		case 9171:
			return 1219;
			break;
		case 9172:
			return 1220;
			break;
		case 9173:
			return 1221;
			break;
		case 9174:
			return 1222;
			break;
		case 9175:
			return 1223;
			break;
		case 9176:
			return 1224;
			break;
		case 9177:
			return 1225;
			break;
		case 9178:
			return 1226;
			break;
		case 9179:
			return 1227;
			break;
		case 9180:
			return 1228;
			break;
		case 9181:
			return 1229;
			break;
		case 9182:
			return 1230;
			break;
			case 9183:
			return 1026;
			break;
		case 9184:
			return 1026;
			break;
		case 9185:
			return 1025;
			break;
		case 9186:
			return 1025;
			break;
		case 9187:
			return 1025;
			break;
		case 9188:
			return 1026;
			break;
		case 9189:
			return 1265;
			break;
		case 9190:
			return 1266;
			break;
			case 9224:
			return 3139;
			break;
		case 9225:
			return 3139;
			break;
		case 9226:
			return 3139;
			break;
		case 9227:
			return 3139;
			break;
		case 9228:
			return 3139;
			break;
		case 9229:
			return 3139;
			break;
		case 9230:
			return 3139;
			break;
		case 9231:
			return 3139;
			break;
		case 9232:
			return 3139;
			break;

			case 9267:
			return 1209;
			break;
		case 9268:
			return 1210;
			break;
		case 9269:
			return 1211;
			break;
		case 9270:
			return 1212;
			break;
		case 9271:
			return 1213;
			break;
		case 9272:
			return 1214;
			break;
		case 9273:
			return 1219;
			break;
		case 9274:
			return 1220;
			break;
		case 9275:
			return 1221;
			break;
		case 9276:
			return 1222;
			break;
		case 9277:
			return 1223;
			break;
		case 9278:
			return 1224;
			break;
		case 9279:
			return 1225;
			break;
		case 9280:
			return 1226;
			break;
		case 9281:
			return 1227;
			break;
		case 9282:
			return 1228;
			break;
		case 9283:
			return 1229;
			break;
		case 9284:
			return 1230;
			break;
			case 9288:
			return 1025;
			break;
		case 9289:
			return 1026;
			break;
		case 9290:
			return 3362;
			break;
		case 9291:
			return 3362;
			break;
		case 9292:
			return 3361;
			break;
		case 9293:
			return 3361;
			break;
		case 9294:
			return 3388;
			break;
		case 9295:
			return 3404;
			break;
		case 9296:
			return 1026;
			break;
		case 9297:
			return 3398;
			break;
		case 9298:
			return 3389;
			break;
		case 9299:
			return 1025;
			break;
		case 9304:
			return 1515;
			break;
		case 9466:
			return 1774;
			break;
		case 9467:
			return 1774;
			break;
		case 9468:
			return 1774;
			break;
		case 9469:
			return 1774;
			break;
		case 9485:
			return 1547;
			break;
		case 9486:
			return 1547;
			break;
		case 9532:
			return 1546;
			break;
		case 9533:
			return 1546;
			break;
		case 9573:
			return 1385;
			break;
		case 9574:
			return 432;
			break;
		case 9606:
			return 433;
			break;
		case 9671:
			return 777;
			break;
		case 9672:
			return 406;
			break;
		case 9673:
			return 3152;
			break;
		case 9682:
			return 1284;
			break;
		case 9683:
			return 1284;
			break;
		case 9684:
			return 1284;
			break;
		case 9685:
			return 1284;
			break;
		case 9846:
			return 433;
			break;
		case 10164:
			return 919;
			break;
		case 10177:
			return 1049;
			break;
		case 10178:
			return 1050;
			break;
		case 10179:
			return 1051;
			break;
		case 10180:
			return 1050;
			break;
		case 10181:
			return 1053;
			break;
		case 10182:
			return 1049;
			break;
		case 10183:
			return 1053;
			break;
		case 10184:
			return 1049;
			break;
		case 10185:
			return 1053;
			break;
		case 10186:
			return 1050;
			break;
		case 10187:
			return 1053;
			break;
		case 10192:
			return 1049;
			break;
		case 10193:
			return 1049;
			break;
		case 10195:
			return 1050;
			break;
		case 10196:
			return 1050;
			break;
		case 10226:
			return 1036;
			break;
		case 10227:
			return 1037;
			break;
		case 10228:
			return 1038;
			break;
		case 10229:
			return 1039;
			break;
		case 10230:
			return 1040;
			break;
		case 10231:
			return 1041;
			break;
		case 10232:
			return 1042;
			break;
		case 10233:
			return 1043;
			break;
		case 10234:
			return 1044;
			break;
		case 10235:
			return 1045;
			break;
		case 10236:
			return 1046;
			break;
		case 10237:
			return 1047;
			break;
		case 10238:
			return 1048;
			break;
		case 10239:
			return 1037;
			break;
		case 10240:
			return 1037;
			break;
		case 10241:
			return 1037;
			break;
		case 10242:
			return 1036;
			break;
		case 10243:
			return 1036;
			break;
		case 10244:
			return 1036;
			break;
		case 10245:
			return 1037;
			break;
		case 10246:
			return 1037;
			break;
		case 10247:
			return 1036;
			break;
		case 10248:
			return 1036;
			break;
		case 10249:
			return 1049;
			break;
		case 10250:
			return 1050;
			break;
		case 10251:
			return 1051;
			break;
		case 10252:
			return 1052;
			break;
		case 10253:
			return 1053;
			break;
		case 10254:
			return 1054;
			break;
		case 10255:
			return 1055;
			break;
		case 10256:
			return 1056;
			break;
		case 10257:
			return 1057;
			break;
		case 10258:
			return 1058;
			break;
		case 10259:
			return 1059;
			break;
		case 10260:
			return 1049;
			break;
		case 10261:
			return 1050;
			break;
		case 10262:
			return 1263;
			break;
		case 10263:
			return 1264;
			break;
		case 10264:
			return 1263;
			break;
		case 10265:
			return 1264;
			break;
		case 10266:
			return 1263;
			break;
		case 10267:
			return 1264;
			break;
		case 10268:
			return 1209;
			break;
		case 10269:
			return 1210;
			break;
		case 10270:
			return 1211;
			break;
		case 10271:
			return 1212;
			break;
		case 10272:
			return 1213;
			break;
		case 10273:
			return 1214;
			break;
		case 10274:
			return 1219;
			break;
		case 10275:
			return 1220;
			break;
		case 10276:
			return 1221;
			break;
		case 10277:
			return 1222;
			break;
		case 10278:
			return 1223;
			break;
		case 10279:
			return 1224;
			break;
		case 10280:
			return 1225;
			break;
		case 10281:
			return 1226;
			break;
		case 10282:
			return 1227;
			break;
		case 10283:
			return 1228;
			break;
		case 10284:
			return 1229;
			break;
		case 10285:
			return 1230;
			break;
		case 10286:
			return 1049;
			break;
		case 10287:
			return 1050;
			break;
			case 10325:
			return 942;
			break;
		case 10326:
			return 942;
			break;
		case 10327:
			return 941;
			break;
		case 10328:
			return 941;
			break;
		case 10329:
			return 939;
			break;
		case 10330:
			return 944;
			break;
		case 10331:
			return 939;
			break;
		case 10333:
			return 931;
			break;
		case 10334:
			return 931;
			break;
		case 10335:
			return 932;
			break;
		case 10336:
			return 932;
			break;
		case 10337:
			return 929;
			break;
		case 10338:
			return 934;
			break;
		case 10339:
			return 929;
			break;
		case 10340:
			return 934;
			break;
			case 10398:
			return 413;
			break;
		case 10399:
			return 413;
			break;
		case 10400:
			return 413;
			break;
		case 10401:
			return 413;
			break;
		case 10402:
			return 413;
			break;
		case 10403:
			return 413;
			break;
		case 10404:
			return 413;
			break;
		case 10435:
			return 1053;
			break;
		case 10468:
			return 1212;
			break;
		case 10469:
			return 1213;
			break;
		case 10470:
			return 1214;
			break;
		case 10471:
			return 1221;
			break;
		case 10472:
			return 1222;
			break;
		case 10473:
			return 1229;
			break;
		case 10474:
			return 1230;
			break;
		case 10475:
			return 1225;
			break;
		case 10476:
			return 1226;
			break;
		case 10477:
			return 1209;
			break;
		case 10478:
			return 1210;
			break;
		case 10479:
			return 1211;
			break;
		case 10480:
			return 1219;
			break;
		case 10481:
			return 1220;
			break;
		case 10482:
			return 1227;
			break;
		case 10483:
			return 1228;
			break;
		case 10484:
			return 1223;
			break;
		case 10485:
			return 1224;
			break;
		case 10486:
			return 1267;
			break;
		case 10487:
			return 1268;
			break;
		case 10488:
			return 1267;
			break;
		case 10489:
			return 1268;
			break;
		case 10490:
			return 1267;
			break;
		case 10491:
			return 1268;
			break;
		case 10492:
			return 791;
			break;
		case 10493:
			return 791;
			break;
		case 10494:
			return 791;
			break;
		case 10495:
			return 791;
			break;
		case 10496:
			return 791;
			break;
		case 10497:
			return 791;
			break;
		case 10498:
			return 791;
			break;
		case 10765:
			return 3152;
			break;
		case 10766:
			return 407;
			break;
		case 10767:
			return 407;
			break;
		case 10768:
			return 407;
			break;
		case 10769:
			return 407;
			break;
		case 10770:
			return 407;
			break;
		case 10771:
			return 407;
			break;
		case 10772:
			return 407;
			break;
		case 10773:
			return 407;
			break;
		case 10774:
			return 407;
			break;
		case 10986:
			return 1487;
			break;
		case 10987:
			return 1488;
			break;
		case 10988:
			return 1489;
			break;
		case 11062:
			return 426;
			break;
		case 11063:
			return 426;
			break;
		case 11075:
			return 1212;
			break;
		case 11076:
			return 1213;
			break;
		case 11077:
			return 1214;
			break;
		case 11080:
			return 1229;
			break;
		case 11081:
			return 1230;
			break;
		case 11082:
			return 1225;
			break;
		case 11083:
			return 1226;
			break;
		case 11084:
			return 1209;
			break;
		case 11085:
			return 1210;
			break;
		case 11086:
			return 1211;
			break;
		case 11089:
			return 1227;
			break;
		case 11090:
			return 1228;
			break;
		case 11091:
			return 1223;
			break;
		case 11092:
			return 1224;
			break;
			case 11114:
			return 3263;
			break;
		case 11123:
			return 3687;
			break;
		case 11856:
			return 1284;
			break;
		case 11857:
			return 1284;
			break;
		case 11858:
			return 1284;
			break;
		case 11859:
			return 1284;
			break;
		case 11860:
			return 1284;
			break;
		case 11861:
			return 1284;
			break;
		case 11862:
			return 1284;
			break;
		case 11863:
			return 1284;
			break;
		case 11945:
			return 424;
			break;
		case 11947:
			return 424;
			break;
		case 11953:
			return 424;
			break;
		case 11954:
			return 424;
			break;
		case 11955:
			return 424;
			break;
		case 11956:
			return 424;
			break;
		case 11957:
			return 424;
			break;
		case 11958:
			return 424;
			break;
		case 12188:
			return 1212;
			break;
		case 12189:
			return 1213;
			break;
		case 12190:
			return 1214;
			break;
		case 12193:
			return 1221;
			break;
		case 12194:
			return 1222;
			break;
		case 12195:
			return 1229;
			break;
		case 12196:
			return 1230;
			break;
		case 12197:
			return 1209;
			break;
		case 12198:
			return 1210;
			break;
		case 12199:
			return 1211;
			break;
		case 12202:
			return 1219;
			break;
		case 12203:
			return 1220;
			break;
		case 12204:
			return 1227;
			break;
		case 12205:
			return 1228;
			break;
		case 12272:
			return 1284;
			break;
		case 12321:
			return 1394;
			break;
		case 12373:
			return 407;
			break;
		case 12374:
			return 407;
			break;
		case 12375:
			return 407;
			break;
		case 12376:
			return 407;
			break;
		case 12377:
			return 407;
			break;
		case 12378:
			return 407;
			break;
		case 12379:
			return 407;
			break;
		case 12380:
			return 407;
			break;
		case 12381:
			return 407;
			break;
		case 17665:
			return 106;
			break;
		case 17666:
			return 106;
			break;
		case 17667:
			return 106;
			break;
		case 17668:
			return 106;
			break;
		case 17669:
			return 106;
			break;
		case 17670:
			return 106;
			break;
		case 17671:
			return 106;
			break;
		case 17672:
			return 106;
			break;
		case 17673:
			return 4786;
			break;
		case 17674:
			return 4784;
			break;
		case 17675:
			return 4785;
			break;
		case 17676:
			return 4787;
			break;
		case 17677:
			return 4795;
			break;
		case 17678:
			return 4794;
			break;
		case 17679:
			return 4792;
			break;
		case 17680:
			return 4793;
			break;
		case 17681:
			return 4791;
			break;
		case 17682:
			return 4790;
			break;
		case 17683:
			return 4788;
			break;
		case 17684:
			return 4789;
			break;
		case 18162:
			return 4411;
			break;
		case 18163:
			return 4413;
			break;
		case 18164:
			return 4415;
			break;
		case 18165:
			return 4417;
			break;
		case 18166:
			return 4419;
			break;
		case 18167:
			return 4412;
			break;
		case 18168:
			return 4414;
			break;
		case 18169:
			return 4416;
			break;
		case 18170:
			return 4418;
			break;
		case 18171:
			return 4420;
			break;
		case 18172:
			return 4514;
			break;
		case 18173:
			return 4516;
			break;
		case 18174:
			return 4515;
			break;
		case 18175:
			return 4517;
			break;
		case 18176:
			return 4521;
			break;
		case 18177:
			return 4520;
			break;
		case 18178:
			return 4518;
			break;
		case 18179:
			return 4519;
			break;
		case 18180:
			return 4525;
			break;
		case 18181:
			return 4524;
			break;
		case 18182:
			return 4522;
			break;
		case 18183:
			return 4523;
			break;
		case 18184:
			return 4514;
			break;
		case 18185:
			return 4516;
			break;
		case 18186:
			return 4515;
			break;
		case 18187:
			return 4517;
			break;
		case 18188:
			return 4521;
			break;
		case 18189:
			return 4520;
			break;
		case 18190:
			return 4518;
			break;
		case 18191:
			return 4519;
			break;
		case 18192:
			return 4525;
			break;
		case 18193:
			return 4524;
			break;
		case 18194:
			return 4522;
			break;
		case 18195:
			return 4523;
			break;
		case 18580:
			return 4691;
			break;
		case 18581:
			return 4692;
			break;
		case 18582:
			return 4693;
			break;
		case 18583:
			return 4694;
			break;
		case 18584:
			return 4695;
			break;
		case 18585:
			return 4696;
			break;
		case 18586:
			return 4697;
			break;
		case 18587:
			return 4698;
			break;
		case 18588:
			return 4699;
			break;
		case 18589:
			return 4700;
			break;
		case 18590:
			return 4701;
			break;
		case 18591:
			return 4877;
			break;
		case 18592:
			return 4878;
			break;
		case 18593:
			return 4715;
			break;
		case 18594:
			return 4713;
			break;
		case 18595:
			return 4714;
			break;
		case 18596:
			return 4716;
			break;
		case 18597:
			return 4724;
			break;
		case 18598:
			return 4723;
			break;
		case 18599:
			return 4721;
			break;
		case 18600:
			return 4722;
			break;
		case 18601:
			return 4720;
			break;
		case 18602:
			return 4719;
			break;
		case 18603:
			return 4717;
			break;
		case 18604:
			return 4718;
			break;
		case 18605:
			return 4876;
			break;
		case 18606:
			return 4877;
			break;
		case 18607:
			return 4878;
			break;
		case 18608:
			return 4879;
			break;
		case 18609:
			return 4880;
			break;
		case 18610:
			return 4881;
			break;
		case 18611:
			return 4882;
			break;
		case 18612:
			return 4876;
			break;
		case 18764:
			return 405;
			break;
		case 18765:
			return 405;
			break;
		case 18766:
			return 405;
			break;
		case 18767:
			return 405;
			break;
		case 18768:
			return 405;
			break;
		case 18769:
			return 405;
			break;
		case 18770:
			return 436;
			break;
		case 18771:
			return 436;
			break;
		case 18772:
			return 437;
			break;
		case 18773:
			return 437;
			break;
		case 18774:
			return 434;
			break;
		case 18775:
			return 434;
			break;
		case 18776:
			return 435;
			break;
		case 18777:
			return 435;
			break;
			case 18902:
			return 436;
			break;
		case 18903:
			return 442;
			break;
		case 18904:
			return 434;
			break;
		case 18905:
			return 443;
			break;
		case 18906:
			return 437;
			break;
		case 18907:
			return 444;
			break;
		case 18908:
			return 435;
			break;
		case 18909:
			return 445;
			break;
		case 18910:
			return 436;
			break;
		case 18911:
			return 442;
			break;
		case 18912:
			return 434;
			break;
		case 18913:
			return 443;
			break;
		case 18914:
			return 437;
			break;
		case 18915:
			return 444;
			break;
		case 18916:
			return 435;
			break;
		case 18917:
			return 445;
			break;
		case 19785:
			return 431;
			break;
		case 19786:
			return 431;
			break;
		case 19787:
			return 431;
			break;
		case 19788:
			return 431;
			break;
		case 19789:
			return 431;
			break;
		case 19790:
			return 431;
			break;
		case 19824:
			return 413;
			break;
		case 19825:
			return 413;
			break;
		case 19826:
			return 413;
			break;
		case 19827:
			return 413;
			break;
		case 20230:
			return 4691;
			break;
		 case 6739:
        return 1036;
        break;
    case 6740:
        return 1037;
        break;
    case 6741:
        return 1038;
        break;
    case 6742:
        return 1039;
        break;
    case 6743:
        return 1040;
        break;
    case 6744:
        return 1041;
        break;
    case 6745:
        return 1042;
        break;
    case 6746:
        return 1043;
        break;
    case 6747:
        return 1044;
        break;
    case 6748:
        return 1045;
        break;
    case 6749:
        return 1046;
        break;
	case 6773:
        return 1047;
        break;
    case 6774:
        return 1048;
        break;
    case 6775:
        return 1049;
        break;
    case 6776:
        return 1050;
        break;
    case 6777:
        return 1051;
        break;
    case 6778:
        return 1052;
        break;
    case 6779:
        return 1053;
        break;
    case 6780:
        return 1054;
        break;
    case 6781:
        return 1055;
        break;
    case 6782:
        return 1056;
        break;
    case 6783:
        return 1057;
        break;
		
	 case 6839:
        return 1058;
        break;
    case 6840:
        return 1059;
        break;
    case 6841:
        return 1060;
        break;
    case 6842:
        return 1061;
        break;
    case 6843:
        return 1062;
        break;
    case 6844:
        return 1063;
        break;
    case 6845:
        return 1064;
        break;
    case 6846:
        return 1065;
        break;
    case 6847:
        return 1066;
        break;
    case 6848:
        return 1067;
        break;
    case 6849:
        return 1068;
        break;
	  case 8475:
        return 1069;
        break;
    case 8476:
        return 1070;
        break;
    case 8477:
        return 1071;
        break;
    case 8478:
        return 1072;
        break;
    case 8479:
        return 1073;
        break;
    case 8480:
        return 1074;
        break;
    case 8481:
        return 1075;
        break;
    case 8482:
        return 1076;
        break;
    case 8483:
        return 1077;
        break;
    case 8484:
        return 1078;
        break;
    case 8485:
        return 1079;
        break;
	 case 9191:
        return 2231;
        break;	
		
	case 8148:
	return 1289;
	break;
	case 8149:
	return 1288;
	break;
	case 8150:
	return 1286;
	break;
	case 8151:
	return 1287;
	break;
	
	
	case 8144:
	return 1289;
	break;
	case 8145:
	return 1288;
	break;
	case 8147:
	return 1287;
	break;
	case 8146:
	return 1286;
	break;

		default:
			return id;
	}

	return id;
}


