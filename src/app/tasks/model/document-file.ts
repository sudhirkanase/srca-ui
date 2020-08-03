import { DocumentDetail } from './document-detail';

export class DocumentWithFile {
    // document: DocumentDetail;
    taskId: number;
    documentTypeId: number;
    notes: string;
    file: FormData;
}
