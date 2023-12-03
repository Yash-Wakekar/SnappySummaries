from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .settings import BASE_DIR
from .utlis import summarize_data, get_file_extension, save_uploaded_file, extract_text_pdf, extract_text_docx, extact_text_audio
from django.http.response import JsonResponse
import os
class Summary(APIView):
    @csrf_exempt
    def post(self,request):
        try:
            request_data = dict(request.data)
            data = " No data"
            output = "Title: No title  Summary: No Summary"
            if(request_data['inputType'][0] == 'text'):
                data = request_data['textValue'][0]
                output = summarize_data(request_data['textValue'][0], request_data['minLines'][0], request_data['maxLines'][0], request_data['projectCategory'][0],'text')
            if(request_data['inputType'][0] == 'file'):
                saved_path=save_uploaded_file(request.FILES['selectedFile'])
                file_extension = get_file_extension(str(request_data['selectedFile'][0]))
                if(file_extension=='.pdf'):
                    document_list = extract_text_pdf(os.path.join(BASE_DIR, 'static', saved_path))
                if(file_extension in ['.doc','.docx']):
                    document_list = extract_text_docx(os.path.join(BASE_DIR, 'static', saved_path))
                if(file_extension == '.mp3'):
                    document_list = extact_text_audio(os.path.join(BASE_DIR, 'static', saved_path))
                if os.path.exists(os.path.join(BASE_DIR, 'static', saved_path)):
                    os.remove(os.path.join(BASE_DIR, 'static', saved_path))
                output=summarize_data(document_list,request_data['minLines'][0],request_data['maxLines'][0],request_data['projectCategory'][0],'file')
                for doc in document_list:
                    data=""
                    data = data + str(doc.page_content)

            print(output)
            # Find the position of the title and summary sections
            title_start = output.find("Title: ")
            summary_start = output.find("Summary: ")

            # Extract the title and summary strings
            title = output[title_start + 7:summary_start].strip()
            summary = output[summary_start + 9:].strip()

            return JsonResponse({"projectName": request_data['projectName'][0],"title": title, "summary": summary, "textValue": data, "minLines": request_data['minLines'][0],"maxLines": request_data['maxLines'][0], "category": request_data['projectCategory'][0]},status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class Resummarized(APIView):
    @csrf_exempt
    def post(self, request):
        try:
            request_data = dict(request.data)
            data = " No data"
            output = "Title: No title  Summary: No Summary"
            output = summarize_data(request_data['textValue'][0], request_data['minLines'][0], request_data['maxLines'][0],
                                    request_data['projectCategory'][0], 'text',request_data['userPrompt'][0])

            # Find the position of the title and summary sections
            title_start = output.find("Title: ")
            summary_start = output.find("Summary: ")
            title = output[title_start + 7:summary_start].strip()
            summary = output[summary_start + 9:].strip()
            return JsonResponse(
                {"title": title, "summary": summary}, status=status.HTTP_200_OK)
        except Exception as e:
                print("error- ", e)
                return Response(status=status.HTTP_400_BAD_REQUEST)







